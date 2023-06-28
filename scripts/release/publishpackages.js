#!/usr/bin/env node

/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* eslint-env node */

'use strict';

const releaseTools = require( '@ckeditor/ckeditor5-dev-release-tools' );
const { provideToken } = require( '@ckeditor/ckeditor5-dev-release-tools/lib/utils/cli' );
const { Listr } = require( 'listr2' );
const validateDependenciesVersions = require( './utils/validatedependenciesversions' );
const parseArguments = require( './utils/parsearguments' );
const { RELEASE_DIRECTORY } = require( './utils/constants' );

const cliArguments = parseArguments( process.argv.slice( 2 ) );

// TODO: If nightly: generate a version number. See: #14179.
const latestVersion = releaseTools.getLastFromChangelog();
const versionChangelog = releaseTools.getChangesForVersion( latestVersion );

let githubToken;

const tasks = new Listr( [
	{
		title: 'Validating CKEditor 5 packages.',
		task: () => {
			return validateDependenciesVersions( {
				packagesDirectory: RELEASE_DIRECTORY,
				version: latestVersion
			} );
		}
	},
	{
		title: 'Publishing packages.',
		task: async ( _, task ) => {
			return releaseTools.publishPackages( {
				packagesDirectory: RELEASE_DIRECTORY,
				npmOwner: 'ckeditor',
				npmTag: cliArguments.npmTag,
				listrTask: task,
				confirmationCallback: () => {
					// TODO: If nightly: pass through. See: #14179.

					return task.prompt( { type: 'Confirm', message: 'Do you want to continue?' } );
				},
				optionalEntries: {
					// The `#default` key is used for all packages that do not have own definition.
					default: [
						// Some of CKEditor 5 features do not contain the UI layer.
						// Hence, it is not required to publish the directory.
						'lang',
						// Some of CKEditor 5 features do not define styles or icons.
						'theme',
						// The CKEditor 5 framework does not define features.
						'ckeditor5-metadata.json'
					],

					// Package-specific definition of optional files and directories.
					'@ckeditor/ckeditor5-theme-lark': [
						// Like in defaults, this package does not contain the UI layer. Hence, it is not required to publish the directory.
						'lang',
						// This package does not contain any source code, but only styles in the `theme` directory.
						// Hence, `theme` is not optional.
						'src',
						// Like in defaults, this package does not define features.
						'ckeditor5-metadata.json'
					]
				}
			} );
		},
		retry: 3
	},
	{
		title: 'Pushing changes.',
		task: () => {
			return releaseTools.push( {
				releaseBranch: 'release',
				version: latestVersion
			} );
		},
		skip: cliArguments.nightly
	},
	{
		title: 'Creating the release page.',
		task: async ( _, task ) => {
			const releaseUrl = await releaseTools.createGithubRelease( {
				token: githubToken,
				version: latestVersion,
				description: versionChangelog
			} );

			task.output = `Release page: ${ releaseUrl }`;
		},
		options: {
			persistentOutput: true
		},
		skip: cliArguments.nightly
	}
] );

( async () => {
	try {
		githubToken = await provideToken();

		await tasks.run();
	} catch ( err ) {
		console.error( err );
	}
} )();
