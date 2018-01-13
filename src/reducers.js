import { combineReducers } from 'redux';
import { SET_MAP, CHANGE_MAP, PLAYER_INFO, PLAYER, ENEMY, WEAPONS, HEAL, BOSS, SET_PLAYER_POS, SET_ENEMY_POS, RESIZE_MAP, DARKNESS, 
		 SET_HEAL_POS, SET_WEAPON_POS, SET_UPSTAIRS_POS, REMOVE_POS, LEVEL_UP, INIT_POS, INIT_INFO, UPSTAIRS, SET_BOSS_POS, BOSS_INFO } from './actions';
import { createMap } from './apis';

function map(state = createMap() ,action) {
	switch (action.type) {
		case SET_MAP:
			return action.map;
		case CHANGE_MAP:
			return action.map;		
		default:
			return state;
	}
}

function info(state = [Object.assign({}, PLAYER), Object.assign({}, ENEMY), Object.assign({}, WEAPONS[0]), Object.assign({}, HEAL)], action) {
	switch (action.type) {
		case PLAYER_INFO:
			console.log(PLAYER);
			return [
						Object.assign({}, action.playerInfo),
						...state.slice(1)
			       ];
		case LEVEL_UP:
			return [
						Object.assign({}, state[0], {
							level: state[0].level + 1,
							health: 100 + (state[0].level + 1) * 20,
							attack: state[0].attack + (state[0].level + 1) * 10,
							nextLevel: 40 + (state[0].level + 1) * 40,
						}),
						...state.slice(1)

				   ];
		case BOSS_INFO: 
			return [
				        ...state.slice(0, 4),
				        Object.assign({}, BOSS)
					];
		case INIT_INFO:
		    console.log(PLAYER);
		    return [PLAYER, ENEMY, WEAPONS[0], HEAL];
		case UPSTAIRS:
			console.log(PLAYER);
			return [
						Object.assign({}, state[0], {
							floor: state[0].floor + 1
						}),
						{
							level:state[1].level + 1,
							health: 100 + (state[1].level + 1) * 40,
							attack: 20 + (state[1].level + 1) * 10,
							exp: 10 + (state[1].level + 1) * 40
						},
						Object.assign({}, WEAPONS[state[1].level + 1]),
						{
							level: state[3].level + 1,
							heal: 20 + (state[3].level + 1) * 20
						}
					];
		default:
			return state;
	}
}

function position (state = {player: [], enemys: [], heals: [], weapon: [], upstairs: []}, action) {
	switch (action.type) {
		case SET_PLAYER_POS:
			return 	Object.assign({}, state, {
							player: [
								action.pos
								]
						});
		case SET_ENEMY_POS:
			return 	Object.assign({}, state, {
							enemys: action.poses
						});
		case SET_HEAL_POS:
			return Object.assign({}, state, {
				heals: action.poses
			});
		case SET_WEAPON_POS:
			return Object.assign({}, state, {
				weapon: [
					action.pos
					]
			});
		case SET_UPSTAIRS_POS:
			return Object.assign({}, state, {
				upstairs: [
					action.pos
					]
			});
		case SET_BOSS_POS:
			return Object.assign({}, state, {
				boss: [
				action.pos
				]
			});
		case REMOVE_POS:
			let newState = Object.assign({}, state);
			newState[action.name] = newState[action.name].filter((elem) => {
				return !(elem.x === action.pos.x && elem.y === action.pos.y);
			}).slice();
			return newState;
		case INIT_POS:
			return {player: [], enemys: [], heals: [], weapon: [], upstairs: []};
		default:
			return state;
	}
}

function mapInfo (state = {width: document.body.clientWidth, height: document.body.clientHeight, darkness: true}, action) {
	switch (action.type) {
		case RESIZE_MAP:
			return Object.assign({}, state, {
						width: action.width,
						height: action.height
				    });
		case DARKNESS:
			return Object.assign({}, state, {
				darkness: !state.darkness
			});
		default:
			return state;
	}
}
export default combineReducers({
	map,
	info,
	position,
	mapInfo
});