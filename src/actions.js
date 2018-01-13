import { createMap } from './apis';
//定义常量,所有可能的action.type
export const SET_MAP = 'SET_MAP';
export const CHANGE_MAP = 'CHANGE_MAP';
export const PLAYER_INFO = 'PLAYER_INFO';
export const SET_PLAYER_POS ='SET_PLAYER_POS';
export const ENEMY_INFO = 'ENEMY_INFO';
export const SET_ENEMY_POS = 'ENEMY_POS';
export const HEAL_INFO = 'HEAL_INFO';
export const SET_HEAL_POS = 'HEAL_POS';
export const SET_WEAPON_POS = 'SET_WEAPON_POS';
export const GET_WEAPON = 'GET_WEAPON';
export const SET_UPSTAIRS_POS = 'SET_UPSTAIRS_POS';
export const BOSS_INFO = 'BOSS_INFO';
export const SET_BOSS_POS = 'SET_BOSS_POS';
export const REMOVE_POS = 'REMOVE_POS';
export const LEVEL_UP = 'LEVEL_UP';
export const INIT_POS = 'INIT_POS';
export const INIT_INFO = 'INIT_INFO';
export const UPSTAIRS = 'UPSTAIRS';
export const RESIZE_MAP = 'RESIZE_MAP';
export const DARKNESS = 'DARKNESS';

export const PLAYER = {//玩家初始信息
	level: 0,
	health: 100,
	attack: 10,
	weapon: '拳',
	nextLevel: 40,
	floor: 1
};
export const ENEMY = {//小怪初始信息
	level:0,
	health: 80,
	attack: 5,
	exp: 10
};
export const WEAPONS = [//各种武器信息
	{
		level: 0,
		name: '烧火棍',
		attack: 20
	},
	{
		level: 1,
		name: '长剑',
		attack: 40
	},
	{
		level: 2,
		name: '步枪',
		attack: 80
	},
	{
		level: 3,
		name: '火箭筒',
		attack: 160
	},		
];
export const HEAL = {//药品基本信息
	level: 0,
	heal: 20
}

export const BOSS = {
	level:0,
	health: 300,
	attack: 40,
}

export function setMap () {
	let map = createMap();
	return {
		type:SET_MAP,
		map: map
	}; 
}

export function changeMap (map) {
	return {
		type:CHANGE_MAP,
		map: map
	};
}

export function setPlayerPos (pos) {
	return {
		type: SET_PLAYER_POS,
		pos: pos
	};
}

export function setEnemysPos (poses) {
	return {
		type: SET_ENEMY_POS,
		poses: poses
	};
}

export function setHealsPos (poses) {
	return {
		type: SET_HEAL_POS,
		poses: poses
	}; 
}

export function setWeaponPos (pos) {
	return {
		type: SET_WEAPON_POS,
		pos: pos
	};
}

export function setUpstairsPos (pos) {
	return {
		type: SET_UPSTAIRS_POS,
		pos: pos
	};
}

export function setBossPos (pos) {
	return {
		type: SET_BOSS_POS,
		pos: pos
	};
}

export function setBossInfo (info) {
	return {
		type: BOSS_INFO,
		info: info
	};
}

export function removePos(name, pos) {
	return {
		type: REMOVE_POS,
		name: name,
		pos: pos
	};

}

export function setPlayerInfo (playerInfo) {
	return {
		type: PLAYER_INFO,
		playerInfo: playerInfo
	};
}

export function levelUp() {
	return {
		type: LEVEL_UP
	};
}

export function initPos() {
	return {
		type: INIT_POS
	};
}

export function initInfo() {
	return {
		type:INIT_INFO
	};
}

export function upStairs() {
	return {
		type:UPSTAIRS
	};
}

export function resizeMap(width, height) {
	return {
		type: RESIZE_MAP,
		width: width,
		height: height
	};
}

export function changeDarkness () {
	return {
		type: DARKNESS
	};
}

