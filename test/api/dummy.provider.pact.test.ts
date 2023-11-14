import { versionFromGitTag } from 'absolute-version';
import { Verifier } from '@pact-foundation/pact';
import branchName from 'current-git-branch';
import server from '../../app';
import { LogLevel } from '@pact-foundation/pact-core';

const baseUrl = `http://localhost:${process.env.SERVER_PORT || 9080}`;

const providerOptions = {
  logLevel: 'INFO' as LogLevel,
  providerBaseUrl: baseUrl,
  provider: '101ways-interview-pair-programming-typescript_app',
  providerBranch: `${branchName()}`,
  providerVersion: versionFromGitTag({
    tagGlob: '[0-9]*',
  }),
  matchingRules: {
    body: {},
  },
  stateHandlers: {},
};

const pactUrl =
  './pact/pacts/101ways-interview-pair-programming-typescript_client-101ways-interview-pair-programming-typescript_app.json';

if (process.env.CI) {
  Object.assign(providerOptions, {
    pactBrokerUrl: 'https://gotreasa.pactflow.io/',
    pactUrls: [pactUrl],
    publishVerificationResult: true,
  });
} else {
  Object.assign(providerOptions, {
    pactUrls: [pactUrl],
  });
}

describe('101Ways Interview Pair Programming TypeScript Provider', () => {
  afterAll(async () => {
    await server.close();
  });

  test('tests 101Ways Interview Pair Programming TypeScript api routes', async () => {
    const output: string = await new Verifier(providerOptions).verifyProvider();
    console.log(output);
    expect(output).toContain('finished: 0');
  });
});
