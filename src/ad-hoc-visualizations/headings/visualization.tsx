// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { AdHocTestkeys } from 'common/configs/adhoc-test-keys';
import { TestMode } from 'common/configs/test-mode';
import { VisualizationConfiguration } from 'common/configs/visualization-configuration';
import { Messages } from 'common/messages';
import { TelemetryDataFactory } from 'common/telemetry-data-factory';
import { VisualizationType } from 'common/types/visualization-type';
import { generateUID } from 'common/uid-generator';
import { adhoc as content } from 'content/adhoc';
import { AdhocStaticTestView } from 'DetailsView/components/adhoc-static-test-view';
import { ScannerUtils } from 'injected/scanner-utils';
import { VisualizationInstanceProcessor } from 'injected/visualization-instance-processor';
import { isEmpty } from 'lodash';
import * as React from 'react';

const { guidance } = content.headings;

export const HeadingsAdHocVisualization: VisualizationConfiguration = {
    getTestView: props => <AdhocStaticTestView {...props} />,
    key: AdHocTestkeys.Headings,
    testMode: TestMode.Adhoc,
    getStoreData: data => data.adhoc.headings,
    enableTest: data => (data.enabled = true),
    disableTest: data => (data.enabled = false),
    getTestStatus: data => data.enabled,
    displayableData: {
        title: 'Headings',
        enableMessage: 'Finding headings...',
        toggleLabel: 'Show headings',
        linkToDetailsViewText: 'How to test headings',
    },
    chromeCommand: '03_toggle-headings',
    launchPanelDisplayOrder: 3,
    adhocToolsPanelDisplayOrder: 3,
    resultProcessor: (scanner: ScannerUtils) => scanner.getAllCompletedInstances,
    getAnalyzer: provider =>
        provider.createRuleAnalyzer({
            rules: ['heading-order'],
            resultProcessor: (scanner: ScannerUtils) => scanner.getAllCompletedInstances,
            telemetryProcessor: (telemetryFactory: TelemetryDataFactory) => telemetryFactory.forTestScan,
            key: AdHocTestkeys.Headings,
            testType: VisualizationType.Headings,
            analyzerMessageType: Messages.Visualizations.Common.ScanCompleted,
        }),
    getIdentifier: () => AdHocTestkeys.Headings,
    visualizationInstanceProcessor: () => VisualizationInstanceProcessor.nullProcessor,
    getNotificationMessage: selectorMap => (isEmpty(selectorMap) ? 'No headings found' : null),
    getDrawer: provider => provider.createHeadingsDrawer(),
    getSwitchToTargetTabOnScan: () => false,
    getInstanceIdentiferGenerator: () => generateUID,
    guidance,
};
