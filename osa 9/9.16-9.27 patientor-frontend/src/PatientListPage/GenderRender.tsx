import React from 'react';
import { Gender } from '../types';
import { Icon } from 'semantic-ui-react';

const GenderRender : React.FC<{gender: Gender}> = ({gender}) => {
    switch (gender) {
        case "female":
            return <Icon name="venus" />;
        case "male":
            return <Icon name="mars" />;
        default:
            return <Icon name="genderless" />;
    }
}

export default GenderRender;