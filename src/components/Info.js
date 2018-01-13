import React, { Component } from 'react';

class Info extends Component {
    render() {
        const { playerInfo } = this.props;
        return (
            <div className='info'>
            	<div className='info-text'>{'等级： ' + playerInfo.level}</div>
            	<div className='info-text'>{'血量： ' + playerInfo.health}</div>
            	<div className='info-text'>{'攻击力： ' + playerInfo.attack}</div>
            	<div className='info-text'>{'武器： ' + playerInfo.weapon}</div>
            	<div className='info-text'>{'升级还需经验： ' + playerInfo.nextLevel}</div>
            	<div className='info-text'>{'楼层： ' + playerInfo.floor}</div>
            	<button className='info-text' onClick={this.props.onDarknessChange}>迷雾</button>
            </div>
        );
    }
}

export default Info;
