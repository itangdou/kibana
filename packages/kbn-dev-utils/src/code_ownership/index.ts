/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { PathLike } from 'fs';
import { run } from '../run';
import { parse } from './code_owners/build_code_owners';
import { ownershipConfig } from './ownership_config';
import { flush } from './code_owners/flush';
import { ToolingLog } from '../tooling_log';

const codeownersPath = process.env.CODEOWNERS_PATH;
const description = `

Create .github/CODEOWNERS file from authoritative source

`;

export const buildPathsMap = () => parse(ownershipConfig);

export const generateCodeOwners = () => {
  run(execute as any, {
    description,
  });
};

function execute({ log }: { log: ToolingLog }) {
  const pathsMap = buildPathsMap();
  printMap(log, pathsMap);
  flush(codeownersPath as PathLike)(log as ToolingLog)(buildPathsMap());
}

function printMap(log: ToolingLog, map: any) {
  for (const [key, value] of map.entries()) {
    log.info(key + ' ' + value.approvers);
  }
}
