//createMap返回一个map数组，每一项是坐标信息以及当前位置上的情况
export function createMap(height = 50, width = 50, numRooms = 20, minRoomLength = 4, MaxRoomLength = 8) {
	let map = [];
	//设置地图每一单元的位置信息以及状态
	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			map.push({
				x: j,
				y: i,
				isWall: true,
			});
		}
	}
	//创建第一个基准房间
	fillFloor(map, {x: 25, y: 25}, {x: 35, y: 35});
	//创建其余房间
	for(var i = 0; i < numRooms; i++){
		placeRoom(map);
	}

	return map;

	//将指定区域内变成地面，start，end形如{x: 2， y: 2}
	function fillFloor (map, start, end) {
		map.forEach( element => {
			if (element.x >= start.x && element.y >= start.y && element.x <= end.x && element.y <= end.y) {
				element.isWall = false;
			}
		});

		
	}
	//放置房间
	function placeRoom (map) {
		while (true) {	
			let door = findADoor(map);
			let roomSize = getRoomSize();
			let startX, startY, endX, endY;
			switch (door.towards) {
				case 'LEFT':
					endX = door.mapInfo.x - 1;
					endY = Math.min(height - 2, getValueBetween(door.mapInfo.y, door.mapInfo.y + roomSize.height));
					startX = Math.max(1, endX - roomSize.width);
					startY = Math.max(1, endY - roomSize.height);
					if (isAllWall(map, {x: startX, y: startY}, {x: endX, y: endY})) {
						fillFloor(map, {x: startX, y: startY}, {x: endX, y: endY});
						return;
					}
					map[door.mapInfo.x + door.mapInfo.y * width].isWall = true;  
					break;
				case 'RIGHT':
					startX = door.mapInfo.x + 1;
					startY = Math.max(1, getValueBetween(door.mapInfo.y, door.mapInfo.y - roomSize.height));
					endX = Math.min(width - 2, startX + roomSize.width);
					endY = Math.min(height -2, startY + roomSize.height);
					if (isAllWall(map, {x: startX, y: startY}, {x: endX, y: endY})) {
						fillFloor(map, {x: startX, y: startY}, {x: endX, y: endY});
						return;
					}
					map[door.mapInfo.x + door.mapInfo.y * width].isWall = true; 
					break;
				case 'TOP':
					endX = Math.min(width - 2, getValueBetween(door.mapInfo.x, door.mapInfo.x + roomSize.width));
					endY = door.mapInfo.y - 1;
					startX = Math.max(1, endX - roomSize.width);
					startY = Math.max(1, endY - roomSize.height);
					if (isAllWall(map, {x: startX, y: startY}, {x: endX, y: endY})) {
						fillFloor(map, {x: startX, y: startY}, {x: endX, y: endY});
						return;
					}
					map[door.mapInfo.x + door.mapInfo.y * width].isWall = true; 
					break;
				case 'BOTTOM':
					startX = Math.max(1, getValueBetween(door.mapInfo.x - roomSize.width, door.mapInfo.x));
					startY = door.mapInfo.y + 1;
					endX = Math.min(width - 2, startX + roomSize.width);
					endY = Math.min(height - 2, startY + roomSize.height);
					if (isAllWall(map, {x: startX, y: startY}, {x: endX, y: endY})) {
						fillFloor(map, {x: startX, y: startY}, {x: endX, y: endY});
						return ;
					}
					map[door.mapInfo.x + door.mapInfo.y * width].isWall = true; 
					break;
			}
	    }
	}
	//获得房间的长宽
	function getRoomSize() {
		let roomH = getValueBetween(minRoomLength, MaxRoomLength);
		let roomW = getValueBetween(minRoomLength, MaxRoomLength);
		return {width: roomW, height: roomH};
	}
	//找一个开门的地方
	function findADoor (map) {
		var door = {};
		while (true) {
		 	let randomNum = getValueBetween(2 * width , height * (width - 2));
		 	if (map[randomNum].isWall === false || randomNum % height === 0 || randomNum % (height - 1) === 0 || randomNum % (height + 1) === 0 || randomNum % (height - 2) === 0) {
		 		continue;
		 	}		 	
		 	if (map[randomNum - 1].isWall === true && map[randomNum + 1].isWall === false) {
		 		map[randomNum].isWall = false;
				door.mapInfo = map[randomNum];
	 			door.towards = 'LEFT';
	 			break;
		 	} else if (map[randomNum + 1].isWall === true && map[randomNum - 1].isWall === false) {
		 		map[randomNum].isWall = false;
		 		door.mapInfo = map[randomNum];
		 		door.towards = 'RIGHT';
		 		break;
		 	} else if (map[randomNum + width].isWall === true && map[randomNum - width].isWall === false) {
		 		map[randomNum].isWall = false;
		 		door.mapInfo = map[randomNum];
		 		door.towards = 'BOTTOM';
		 		break;
		 	} else if (map[randomNum - width].isWall === true && map[randomNum + width].isWall === false) {
		 		map[randomNum].isWall = false;
				door.mapInfo = map[randomNum];
				door.towards = 'TOP';
				break;
		 	} 
		}
    return door; 
	}

	function isAllWall(map, start, end) {
		let numClear = 0;
		map.forEach( element => {
			if (element.x >= start.x && element.y >= start.y && element.x <= end.x && element.y <= end.y) {
				if (element.isWall === true) {
					numClear++;
				}
			}
		});
		if (numClear === (end.x - start.x + 1) * (end.y - start.y + 1))  {
			return true;
		}
		return false;
	}
}

//获得a，b之间任意整数
export function getValueBetween (a, b) {
		return Math.floor(Math.random() * (b - a + 1) + a);
	}

//与地图中其他位置信息不重合,返回元素种类
export function isOverFlow (pos, posInfo) {
	if (!posInfo) {
		return false;
	};
	//对象遍历
	for (let key in posInfo) {
		for(var j = 0; j < posInfo[key].length; j++){
			if (posInfo[key][j].x === pos.x && posInfo[key][j].y === pos.y) {
				return key;
			}
		}
	}
	return false;
}
//判断坐标上是否是墙
export function isWall (map, pos) {
	return map[pos.x + 50 * pos.y].isWall;
}

//生成怪物攻击数值
export function getEnemyAttack(basicAttack) {
	let range = Math.floor(basicAttack * 0.2);
	let addValue = Number((Math.random() > 0.5 ? '+' : '-') + Math.floor(Math.random() * range + 1));
	return addValue + basicAttack; 
}

		

		




