import React, { Component } from 'react';
import Square from './Square';
class Board extends Component {
	renderSquare(i) {
		return (
			<Square key={i} info={this.props.map[i]} posInfo={this.props.pos} darkness={this.props.mapInfo.darkness}/>
			);
	}
    render() {
        const { pos, mapInfo } = this.props;
        let darkness = mapInfo.darkness;
        let bgColor = darkness ? 'black' : 'grey';
        //let start = Date.now();
        if (mapInfo) {
            let screenWidth = mapInfo.width;
            let screenHeight = mapInfo.height;
            var boardLeft = (screenWidth / 2 - 250 ) + 'px';
            var boardTop = (screenHeight / 2 + 180 ) + 'px';
        }
        if (pos.player[0]) {
            var left = 250 - (pos.player[0].x + 1) * 10 + 'px';
            var top =  250 - (pos.player[0].y + 1) * 10 + 'px';
        }
    	let rows = [];
    	for(var i = 0; i < 50; i++){
    		let row = []
    		for(var j = 0; j < 50; j++){
    			let index = i * 50 + j;
    			row.push(this.renderSquare(index));
    		}
    		rows.push(<div key={'rows' + i} className='row'>{row}</div>);
    	}
        //console.log(Date.now() - start);
        return (
            <div className='holder' style={{top: boardTop, left: boardLeft, backgroundColor: bgColor}}>
                <div className='board' style={{top: top, left: left}}>
                	{rows}
                </div>
            </div>
        );
    }
}

export default Board;
