// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { isEqual } from 'lodash';
import { ChoiceGroup, IChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Link } from 'office-ui-fabric-react/lib/Link';
import * as React from 'react';

import { ManualTestStatus } from '../../common/types/manual-test-status';
import { VisualizationType } from '../../common/types/visualization-type';
import { radioButtonGroup, radioLabel, undoButton, undoButtonIcon } from './test-status-choice-group.scss';

export interface TestStatusChoiceGroupProps {
    test: VisualizationType;
    step: string;
    selector?: string;
    status: ManualTestStatus;
    originalStatus: number;
    isLabelVisible?: boolean;
    onGroupChoiceChange: (status, test, step, selector?) => void;
    onUndoClicked: (test, step, selector?) => void;
}

interface ChoiceGroupState {
    selectedKey: string;
}

export class TestStatusChoiceGroup extends React.Component<TestStatusChoiceGroupProps, ChoiceGroupState> {
    protected choiceGroup: IChoiceGroup;

    constructor(props) {
        super(props);
        this.state = { selectedKey: ManualTestStatus[this.props.status] };
    }

    public componentDidUpdate(prevProps: Readonly<TestStatusChoiceGroupProps>): void {
        if (isEqual(prevProps, this.props) === false) {
            this.setState(() => ({ selectedKey: ManualTestStatus[this.props.status] }));
        }
    }

    public render(): JSX.Element {
        return (
            <div>
                <div className={radioButtonGroup}>
                    <ChoiceGroup
                        className={ManualTestStatus[this.props.status]}
                        onChange={this.onChange}
                        componentRef={this.compomentRef}
                        selectedKey={this.state.selectedKey}
                        options={[
                            { key: ManualTestStatus[ManualTestStatus.PASS], text: 'Pass', onRenderLabel: this.onRenderLabel },
                            { key: ManualTestStatus[ManualTestStatus.FAIL], text: 'Fail', onRenderLabel: this.onRenderLabel },
                        ]}
                    />
                </div>

                <div>{this.renderUndoButton()}</div>
            </div>
        );
    }

    private onRenderLabel = (option: IChoiceGroupOption): JSX.Element => {
        return (
            <span id={option.labelId} className={radioLabel} aria-label={option.text}>
                {this.props.isLabelVisible ? option.text : ''}
            </span>
        );
    };

    private renderUndoButton(): JSX.Element {
        if (this.props.originalStatus == null) {
            return null;
        }

        return (
            <Link className={undoButton} onClick={this.onUndoClicked}>
                <Icon className={undoButtonIcon} iconName="undo" ariaLabel={'undo'} />
            </Link>
        );
    }

    protected compomentRef = (component: IChoiceGroup): void => {
        this.choiceGroup = component;
    };

    protected onChange = (ev: React.FocusEvent<HTMLElement>, option: IChoiceGroupOption): void => {
        this.setState({ selectedKey: option.key });
        this.props.onGroupChoiceChange(ManualTestStatus[option.key], this.props.test, this.props.step, this.props.selector);
    };

    protected onUndoClicked = (): void => {
        this.setState({ selectedKey: ManualTestStatus[ManualTestStatus.UNKNOWN] });
        this.choiceGroup.focus();
        this.props.onUndoClicked(this.props.test, this.props.step, this.props.selector);
    };
}
