import React, { Component } from 'react';

class Square extends Component {
    render() {
        
        const { info, posInfo, darkness } = this.props;
    	if (info) {
            let bgColor = info.isWall ? 'grey' : 'white';
            if (!info.isWall) {
                if (posInfo.player[0] && posInfo.player[0].x === info.x && posInfo.player[0].y === info.y) {
                    bgColor = 'blue';
                }
                if (posInfo.enemys[0]) {
                    posInfo.enemys.forEach( element => {
                        if (element.x === info.x && element.y === info.y) {
                           bgColor = 'red';
                        }
                    });
                }
                if (posInfo.heals[0]) {
                    posInfo.heals.forEach( element => {
                        if (element.x === info.x && element.y === info.y) {
                           bgColor = 'green';
                        }
                    });
                }
                if (posInfo.weapon[0] && posInfo.weapon[0].x === info.x && posInfo.weapon[0].y === info.y) {
                    bgColor = 'orange';
                }
                if (posInfo.upstairs[0] && posInfo.upstairs[0].x === info.x && posInfo.upstairs[0].y === info.y) {
                    bgColor = 'brown';
                }
                if (posInfo.boss && posInfo.boss[0].x === info.x && posInfo.boss[0].y === info.y) {
                    bgColor = '#9B0AAD';
                }
            }
            if (darkness && posInfo.player[0]) {
                let x = info.x,
                    y = info.y,
                    playerX = posInfo.player[0].x,
                    playerY = posInfo.player[0].y
                if ((Math.pow(x - playerX, 2) + Math.pow(y - playerY, 2)) >= 25 ) {
                    bgColor = 'black';
                }
            }
            
    		return (
            <div className='square' style={{backgroundColor:bgColor}}></div>
        	);
    	} else {
    		return (
    			<div className='square'></div>
    			);
    	}  
    }
}

export default Square;
