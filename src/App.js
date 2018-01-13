import React, { Component } from 'react';
import Header from './components/Header';
import Info from './components/Info';
import Board from './components/Board';
import { connect } from 'react-redux'
import { setMap, setPlayerPos, setEnemysPos, setHealsPos, setWeaponPos, setUpstairsPos, removePos, setBossPos, setBossInfo, 
         setPlayerInfo, levelUp, initPos, initInfo, upStairs, resizeMap, changeDarkness, BOSS } from './actions';
import { getValueBetween, isOverFlow, isWall, getEnemyAttack } from './apis';

var posInfo = {player: [], enemys: [], heals: [], weapon: [], upstairs: [], boss: []};
class App extends Component {
  //设置玩家坐标
  getPlayerPos(map) {
    while (true) {
      var randomNum = getValueBetween(0, map.length - 1);
      if (map[randomNum].isWall === false && !isOverFlow({x: map[randomNum].x, y: map[randomNum].y}, posInfo)) {
        let pos = {
          x: map[randomNum].x,
          y: map[randomNum].y
        };
        this.props.dispatch(setPlayerPos(pos));
        posInfo.player.push(pos);
        break;
      }
    }
  }
  //设置敌人坐标
  getEnemysPos(map) {
    var num = 0;
    var poses = [];
    while (num < 5) {
      var randomNum = getValueBetween(0, map.length - 1);
      if (map[randomNum].isWall === false && !isOverFlow({x: map[randomNum].x, y: map[randomNum].y}, posInfo)) {
        let pos = {
          x: map[randomNum].x,
          y: map[randomNum].y
        };
        poses.push(pos);
        posInfo.enemys.push(pos);
        num++;
     } 
  }
  this.props.dispatch(setEnemysPos(poses));
}
  //设置药品坐标
  getHealsPos(map) {
    var num = 0;
    var poses = [];
    while (num < 5) {
      var randomNum = getValueBetween(0, map.length - 1);
      if (map[randomNum].isWall === false && !isOverFlow({x: map[randomNum].x, y: map[randomNum].y}, posInfo)) {
        let pos = {
          x: map[randomNum].x,
          y: map[randomNum].y
        };
        poses.push(pos);
        posInfo.heals.push(pos);
        num++;
      } 
    }
    this.props.dispatch(setHealsPos(poses));
  }
  //设置武器坐标
  getWeaponPos(map) {
    while (true) {
      var randomNum = getValueBetween(0, map.length - 1);
      if (map[randomNum].isWall === false && !isOverFlow({x: map[randomNum].x, y: map[randomNum].y}, posInfo)) {
        let pos = {
          x: map[randomNum].x,
          y: map[randomNum].y
        };
        posInfo.weapon.push(pos);
        this.props.dispatch(setWeaponPos(pos));
        break;
      }
    }
  }
  //设置楼梯坐标
  getUpstairsPos(map) {
    while (true) {
      var randomNum = getValueBetween(0, map.length - 1);
      if (map[randomNum].isWall === false && !isOverFlow({x: map[randomNum].x, y: map[randomNum].y}, posInfo)) {
        let pos = {
          x: map[randomNum].x,
          y: map[randomNum].y
        };
        posInfo.upstairs.push(pos);
        this.props.dispatch(setUpstairsPos(pos));
        break;
      }
    }    
  }

  getBossPos(map) {
    while (true) {
      var randomNum = getValueBetween(0, map.length - 1);
      if (map[randomNum].isWall === false && !isOverFlow({x: map[randomNum].x, y: map[randomNum].y}, posInfo)) {
        let pos = {
          x: map[randomNum].x,
          y: map[randomNum].y
        };
        posInfo['boss'].push(pos);
        this.props.dispatch(setBossPos(pos));
        break;
      }
    }
  }
  //人物移动
  move(e) {
   
    e.preventDefault();
    let info = this.props.info;
    let playerPos = this.props.position.player[0];
    let map = this.props.map;
    let posInfo = this.props.position;
    let moveTo = {};
    let key = e.keyCode;
    switch (key) {
      case 37:
        moveTo = {x: playerPos.x - 1, y: playerPos.y};
        break;       
      case 38:
        moveTo = {x: playerPos.x, y: playerPos.y - 1};
        break;
      case 39:
        moveTo = {x: playerPos.x + 1, y: playerPos.y};
        break;
      case 40:
        moveTo = {x: playerPos.x, y: playerPos.y + 1};
        break;
      default:
        return;
    }
    if (moveTo.x) {
      this.handleMove(moveTo);
    }
  }

  handleMove(moveTo) {
    let info = this.props.info;
    let map = this.props.map;
    let posInfo = this.props.position;
    if (!isOverFlow(moveTo, posInfo) && !isWall(map, moveTo)) {
      //let start = Date.now();
      this.props.dispatch(setPlayerPos(moveTo));
      //console.log(Date.now() - start);
      return;
    }
    let element = isOverFlow(moveTo, posInfo);
    switch (element) {
      case 'heals':
        this.props.dispatch(removePos('heals', moveTo));
        this.props.dispatch(setPlayerPos(moveTo));
        let maxHealth = 100 + info[0].level * 40;
        let currentHealth = info[0].health;
        let recoveredHealth = ((currentHealth + info[3].heal) > maxHealth) ? maxHealth : (currentHealth + info[3].heal);
        info[0].health = recoveredHealth;
        this.props.dispatch(setPlayerInfo(info[0]));        
        break;
      case 'weapon':
        this.props.dispatch(removePos('weapon', moveTo));
        this.props.dispatch(setPlayerPos(moveTo));
        info[0].attack += info[2].attack;
        info[0].weapon = info[2].name;
        this.props.dispatch(setPlayerInfo(info[0]));  
        break;
      case 'upstairs':
        this.props.dispatch(removePos('upstairs', moveTo));
        this.props.dispatch(setPlayerPos(moveTo));
        this.props.dispatch(upStairs());
        this.props.dispatch(setMap());
        posInfo = {};
        this.getPlayerPos(this.props.map);
        this.getEnemysPos(this.props.map);
        this.getHealsPos(this.props.map);
        this.getWeaponPos(this.props.map);
        if (info[0].floor < 3) {
          this.getUpstairsPos(this.props.map);
        }
        console.log(info[0]); 
        if (info[0].floor === 1) {
          this.getBossPos(this.props.map);
          this.props.dispatch(setBossInfo(BOSS));
        }
        break;
      case 'enemys':
        let playerHealth = info[0].health;
        let enemyHealth  = info[1].health;
        let playerAttack = info[0].attack;
        while (playerHealth > 0 || enemyHealth > 0) {
          enemyHealth -= playerAttack;
          if (enemyHealth <= 0) {
            info[0].health = playerHealth;
            info[0].nextLevel -= info[1].exp;
            if (info[0].nextLevel <= 0) {
              this.props.dispatch(levelUp());
            } else {
              this.props.dispatch(setPlayerInfo(info[0]));
            }
            this.props.dispatch(removePos('enemys', moveTo));
            this.props.dispatch(setPlayerPos(moveTo));
            break;
          }
          playerHealth -= getEnemyAttack(info[1].attack);
          if (playerHealth <= 0) {
            alert('You Lose');
            posInfo = {};
            this.props.dispatch(initPos());
            this.props.dispatch(initInfo());
            this.props.dispatch(setMap());
            this.getPlayerPos(this.props.map);
            this.getEnemysPos(this.props.map);
            this.getHealsPos(this.props.map);
            this.getWeaponPos(this.props.map);
            this.getUpstairsPos(this.props.map);
            break;
          }
        }
        break;
      case 'boss':
        let playerHealthOfBoss = info[0].health;
        let playerAttackOfBoss = info[0].attack;
        let bossHealth = info[4].health;
        while (playerHealthOfBoss > 0 || bossHealth > 0) {
                bossHealth -= playerAttackOfBoss;
                if (bossHealth <= 0) {
                  alert('You Win!');
                  posInfo = {};
                  this.props.dispatch(initPos());
                  this.props.dispatch(initInfo());
                  this.props.dispatch(setMap());
                  this.getPlayerPos(this.props.map);
                  this.getEnemysPos(this.props.map);
                  this.getHealsPos(this.props.map);
                  this.getWeaponPos(this.props.map);
                  this.getUpstairsPos(this.props.map);
                  break;            
                }
                playerHealthOfBoss -= getEnemyAttack(info[4].attack);
                if (playerHealthOfBoss <= 0) {
                  alert('You Lose');
                  posInfo = {};
                  this.props.dispatch(initPos());
                  this.props.dispatch(initInfo());
                  this.props.dispatch(setMap());
                  this.getPlayerPos(this.props.map);
                  this.getEnemysPos(this.props.map);
                  this.getHealsPos(this.props.map);
                  this.getWeaponPos(this.props.map);
                  this.getUpstairsPos(this.props.map);
                  break;
                }
              }      
      default:
        break;
    }
  }
    

  reSize(e) {
    let width = document.body.clientWidth;
    let height = document.body.clientHeight;
    this.props.dispatch(resizeMap(width, height));
  }

  handleClick() {
    this.props.dispatch(changeDarkness());
  }


  componentDidMount() {
    this.getPlayerPos(this.props.map);
    this.getEnemysPos(this.props.map);
    this.getHealsPos(this.props.map);
    this.getWeaponPos(this.props.map);
    this.getUpstairsPos(this.props.map);
    window.addEventListener('keydown', (e) => this.move(e));
    window.addEventListener('resize', (e) => this.reSize(e));
  }

  componentWillUnmount() {
      window.removeEventListener('keydown');
      window.removeEventListener('resize');
  }

  render() {
    return (
      <div>
        <Header />
        <Info playerInfo={this.props.info[0]} onDarknessChange={() => this.handleClick()}/>
        <Board  map={this.props.map} pos={this.props.position} mapInfo={this.props.mapInfo}/>
      </div>
    );
  }
}

function select (state) {
	return {
		map: state.map,
    info: state.info,
    position: state.position,
    mapInfo: state.mapInfo
	}	
}

export default connect(select)(App);
