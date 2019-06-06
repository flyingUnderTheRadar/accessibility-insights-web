// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { shallow } from 'enzyme';
import * as React from 'react';

import {
    NotApplicableChecksSection,
    NotApplicableChecksSectionProps,
} from '../../../../../../../DetailsView/reports/components/report-sections/not-applicable-section';
import { RuleResult } from '../../../../../../../scanner/iruleresults';

describe('PassedChecksSection', () => {
    it('renders', () => {
        const props: NotApplicableChecksSectionProps = {
            scanResult: {
                inapplicable: [{} as RuleResult, {} as RuleResult, {} as RuleResult],
                violations: [],
                passes: [],
                incomplete: [],
                timestamp: 'today',
                targetPageTitle: 'page title',
                targetPageUrl: 'url://page.url',
            },
        };

        const wrapper = shallow(<NotApplicableChecksSection {...props} />);

        expect(wrapper.getElement()).toMatchSnapshot();
    });
});