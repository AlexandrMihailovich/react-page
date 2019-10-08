import React, {FC} from 'react';
import './index.css'

const Drawer: FC<any> = ({ open, children }) => {
    return <div className={'Drawer ' + (open ? 'Drawer__open' : 'Drawer__close')}>{children}</div>
}

export default Drawer;