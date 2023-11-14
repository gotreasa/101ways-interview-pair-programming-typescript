import pact from '@pact-foundation/pact-node';
import { versionFromGitTag } from 'absolute-version';
import { resolve } from 'path';
import branchName from 'current-git-branch';

const options = {
  pactFilesOrDirs: [resolve(__dirname, '../../pact/pacts')],
  pactBroker: 'https://gotreasa.pactflow.io/',
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  consumerVersion: versionFromGitTag({
    tagGlob: '[0-9]*',
  }),
  branch: branchName(),
};

pact
  .publishPacts(options)
  .then(() => {
    console.log('Pact contract publishing complete!');
  })
  .catch((error: Error) => {
    console.log('Pact contract publishing failed: ', error);
  });
