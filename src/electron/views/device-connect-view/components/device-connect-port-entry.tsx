// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { KeyCodeConstants } from 'common/constants/keycode-constants';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';

import { DeviceConnectActionCreator } from '../../../flux/action-creator/device-connect-action-creator';
import { DeviceConnectState } from '../../../flux/types/device-connect-state';
import { deviceConnectPortEntry, portNumberField } from './device-connect-port-entry.scss';

export type DeviceConnectPortEntryViewState = {
    deviceConnectState: DeviceConnectState;
};

export type DeviceConnectPortEntryDeps = {
    deviceConnectActionCreator: DeviceConnectActionCreator;
};

export interface DeviceConnectPortEntryProps {
    deps: DeviceConnectPortEntryDeps;
    viewState: DeviceConnectPortEntryViewState;
}

export interface DeviceConnectPortEntryState {
    port: string;
}

export class DeviceConnectPortEntry extends React.Component<DeviceConnectPortEntryProps, DeviceConnectPortEntryState> {
    constructor(props: DeviceConnectPortEntryProps) {
        super(props);
        this.state = { port: '' };
    }

    public render(): JSX.Element {
        return (
            <div className={deviceConnectPortEntry}>
                <h3>Android device port number</h3>
                <MaskedTextField
                    ariaLabel="Port number"
                    onChange={this.onPortTextChanged}
                    placeholder="12345"
                    className={portNumberField}
                    maskChar=""
                    mask="99999"
                    onKeyDown={this.onEnterKey}
                />
                {this.renderValidationPortButton()}
            </div>
        );
    }

    private renderValidationPortButton(): JSX.Element {
        const props = {
            disabled: this.isValidateButtonDisabled(),
            className: 'button-validate-port',
            onClick: this.onValidateClick,
        };

        if (this.props.viewState.deviceConnectState !== DeviceConnectState.Connected) {
            return <PrimaryButton {...props}>Validate port number</PrimaryButton>;
        }

        return <DefaultButton {...props}>Validate port number</DefaultButton>;
    }

    private isValidateButtonDisabled(): boolean {
        return !this.state.port || this.state.port === '' || this.props.viewState.deviceConnectState === DeviceConnectState.Connecting;
    }

    private onPortTextChanged = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        this.props.deps.deviceConnectActionCreator.resetConnection();
        this.setState({ port: newValue });
    };

    private onValidateClick = (): void => {
        const port = parseInt(this.state.port, 10);
        this.props.deps.deviceConnectActionCreator.validatePort(port);
    };

    private onEnterKey = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.keyCode === KeyCodeConstants.ENTER) {
            this.onValidateClick();
        }
    };
}
