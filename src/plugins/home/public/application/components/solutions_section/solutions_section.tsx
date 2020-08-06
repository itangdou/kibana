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

import React, { Fragment, FC } from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiHorizontalRule } from '@elastic/eui';
import { SolutionPanel } from './solution_panel';
import { FeatureCatalogueSolution } from '../../../';

const sortByOrder = (
  { order: orderA = 0 }: FeatureCatalogueSolution,
  { order: orderB = 0 }: FeatureCatalogueSolution
) => orderA - orderB;

interface Props {
  solutions: FeatureCatalogueSolution[];
}

export const SolutionsSection: FC<Props> = ({ solutions }) => {
  // Separate Kibana from other solutions
  const kibana = solutions.find(({ id }) => id === 'kibana');
  solutions = solutions.sort(sortByOrder).filter(({ id }) => id !== 'kibana');

  return solutions.length || kibana ? (
    <Fragment>
      <EuiFlexGroup className="homSolutions" justifyContent="spaceAround">
        {solutions.length ? (
          <EuiFlexItem grow={1} className="homSolutions__group homSolutions__group--multiple">
            <EuiFlexGroup direction="column">
              {solutions.map((solution) => (
                <SolutionPanel key={solution.id} solution={solution} />
              ))}
            </EuiFlexGroup>
          </EuiFlexItem>
        ) : null}
        {kibana ? <SolutionPanel solution={kibana} /> : null}
      </EuiFlexGroup>

      <EuiHorizontalRule margin="xl" />

      <EuiSpacer size="s" />
    </Fragment>
  ) : (
    <Fragment>
      <EuiSpacer size="xl" />
    </Fragment>
  );
};
