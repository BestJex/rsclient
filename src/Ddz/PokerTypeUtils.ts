/**
 * 牌型工具类
 * 该类负责定义牌型及判断牌型
 */
class PokerTypeUtils {
	public constructor() {
	}

	public static Boom:string 			= "Boom";
	public static KingBoom:string 		= "KingBoom";
	public static Single:string 		= "Single";
	public static Pair:string 			= "Pair";
	public static Three:string 			= "Three";
	public static ThreeSingle:string 	= "ThreeSingle";
	public static ThreePair:string 		= "ThreePair";
	public static Straight:string 		= "Straight";
	public static StraightPairs:string 	= "StraightPairs";
	public static Plane:string 			= "Plane";
	public static Plane2Single:string 	= "Plane2Single";
	public static Plane2Pairs:string 	= "Plane2Pairs";
	public static Four2Single:string 	= "Four2Single";
	public static Four2Pairs:string 	= "Four2Pairs";
	/**
	 * 获取一手牌的类型
	 * pokers 一手牌
	 */
	public static getType(pokers:Array<Poker>):PokerType{
		//先将牌从大到小排序
		pokers = PokerUtils.sortDescPokers(pokers);
		let orderValue:number = -1;
		if((orderValue = this.isBoom(pokers)) != -1) 			
			return new PokerType(this.Boom,orderValue);
		if((orderValue = this.isKingBoom(pokers)) != -1) 		
			return new PokerType(this.KingBoom, orderValue);
		if((orderValue = this.isSingle(pokers)) != -1) 		
			return new PokerType(this.Single, orderValue);
		if((orderValue = this.isPair(pokers)) != -1) 			
			return new PokerType(this.Pair, orderValue);
		if((orderValue = this.isThree(pokers)) != -1) 			
			return new PokerType(this.Three, orderValue);
		if((orderValue = this.isThreeSingle(pokers)) != -1) 	
			return new PokerType(this.ThreeSingle, orderValue);
		if((orderValue = this.isThreePairs(pokers)) != -1) 	
			return new PokerType(this.ThreePair, orderValue);
		if((orderValue = this.isStraight(pokers)) != -1) 		
			return new PokerType(this.Straight, orderValue);
		if((orderValue = this.isStraightPairs(pokers)) != -1) 	
			return new PokerType(this.StraightPairs, orderValue);
		if((orderValue = this.isPlane(pokers)) != -1) 			
			return new PokerType(this.Plane, orderValue);
		if((orderValue = this.isPlane2Single(pokers)) != -1) 	
			return new PokerType(this.Plane2Single, orderValue);
		if((orderValue = this.isPlane2pairs(pokers)) != -1) 	
			return new PokerType(this.Plane2Pairs, orderValue);
		if((orderValue = this.isFour2Single(pokers)) != -1) 	
			return new PokerType(this.Four2Single, orderValue);
		if((orderValue = this.isFour2Pairs(pokers)) != -1) 		
			return new PokerType(this.Four2Pairs, orderValue);
		return null;
	}
	/**
	 * 判断一手牌是否是炸弹（不含王炸）
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
    public static isBoom(array:Array<Poker>):number{
		if(array.length == 4 && array[1].getOrderValue() == array[0].getOrderValue() 
		&& array[2].getOrderValue() == array[0].getOrderValue() 
		&& array[3].getOrderValue() == array[0].getOrderValue()){
			return array[0].getOrderValue();
		}else{
			return -1;
		}
	}
	/**
	 * 判断一手牌是否是王炸
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isKingBoom(array:Array<Poker>):number{
		if(array.length == 2 && array[0].getOrderValue() === PokerUtils.BigKingValue && array[1].getOrderValue() === PokerUtils.SmallKingValue){
			return 0;
		}else{
			return -1;
		}
	}
	/**
	 * 判断一手牌是否是单张
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isSingle(array:Array<Poker>):number{
		if(array.length == 1)  return array[0].getOrderValue();
		return -1;
	}

	/**
	 * 判断一手牌是否是对子
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isPair(array:Array<Poker>):number{
		if(array.length == 2 && array[0].getOrderValue() == array[1].getOrderValue()) 
			return array[0].getOrderValue();
		return -1;
		
	}

	/**
	 * 判断一手牌是否是顺子
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isStraight(array:Array<Poker>):number{
		if(array.length < 5 || array.length >12) return -1;//少于5张或多余12张，牌形不正确
		if(array[0].getOrderValue() > PokerUtils.AValue) return -1;//如果最大的牌大于A，牌形不正确
		for(let i = 0 ; i < array.length - 1; i ++){
			if(array[i].getOrderValue()  != array[i+1].getOrderValue() + 1) return -1;//后一张牌不比前一张牌递次小1，牌形不正确
		}
		return array[0].getOrderValue();
	}

	/**
	 * 判断一手牌是否是三不带
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isThree(array:Array<Poker>):number{
		if(array.length != 3) return -1;//不是三张
		if(array[1].getOrderValue() == array[0].getOrderValue() 
		&& array[2].getOrderValue() == array[0].getOrderValue()) 
			return  array[0].getOrderValue();//三张一样的牌
		return -1;
	}
	/**
	 * 判断一手牌是否是三带一
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isThreeSingle(array:Array<Poker>):number{
		if(array.length != 4) return -1;//不是三张也不是四张，不是三带
		if(array[1].getOrderValue() === array[0].getOrderValue() 
			&& array[2].getOrderValue() === array[0].getOrderValue() 
			&& array[3].getOrderValue() != array[0].getOrderValue()) 
			return array[0].getOrderValue();//前三张一样后一张不一样 
		if(array[1].getOrderValue() === array[3].getOrderValue() 
			&& array[2].getOrderValue() === array[3].getOrderValue() 
			&& array[0].getOrderValue() != array[3].getOrderValue()) 
			return array[1].getOrderValue();//前一张不一样后三张一样
		return -1;
	}
	/**
	 * 判断一手牌是否是三带二
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isThreePairs(array:Array<Poker>):number{
		if(array.length != 5) return -1;//不是三张也不是四张，不是三带
		if(array[1].getOrderValue() === array[0].getOrderValue() 
			&& array[2].getOrderValue() === array[0].getOrderValue() 
			&& array[3].getOrderValue() != array[0].getOrderValue() 
			&& array[3].getOrderValue() === array[4].getOrderValue()) 
			return array[0].getOrderValue();//前三张一样后一张不一样   //前三张一样，后两张一样
		if(array[0].getOrderValue() === array[1].getOrderValue() 
			&& array[2].getOrderValue() === array[3].getOrderValue() 
			&& array[3].getOrderValue() === array[4].getOrderValue() 
			&& array[0].getOrderValue() != array[2].getOrderValue()) 
			return array[2].getOrderValue();//前两张一样，后三张一样
		return -1;
	}
	/**
	 * 判断一手牌是否是连对
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isStraightPairs(array:Array<Poker>):number{
		if(array.length < 6 || array.length > 20 || array.length % 2 != 0) return -1;
		if(array[0].getOrderValue() < 3) return -1;//如果最大的牌大于A，牌形不正确

		for(let i = 0 ; i < array.length - 1 ; i += 2){
			if(array[i].getOrderValue() != array[i+1].getOrderValue()) return -1;
		}
		for(let i = 0 ; i < array.length - 2; i += 2){
			if(array[i].getOrderValue() != array[i+2].getOrderValue() +1 ) return -1;
		}
		return array[0].getOrderValue();
	}
	/**
	 * 判断一手牌是否是飞机不带翅膀
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isPlane(array:Array<Poker>):number{
		if(array.length != 6) return -1;
		if(array[0].getOrderValue() < 3) return -1;//如果最大的牌大于A，牌形不正确(不能三个2 三个A)
		if(array[0].getOrderValue() === array[1].getOrderValue() && array[1].getOrderValue() === array[2].getOrderValue() 
			&& array[3].getOrderValue() === array[4].getOrderValue() && array[4].getOrderValue() === array[5].getOrderValue() 
			&& array[0].getOrderValue() === array[3].getOrderValue() + 1) 
		 	return array[0].getOrderValue();
		return -1; 
	}
	/**
	 * 判断一手牌是否是飞机带两张单牌
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isPlane2Single(array:Array<Poker>):number{
		let a:Array<Poker> = [];
		if(array.length != 8) return -1;
		//判断有没有三张相同的牌
		for(let i = 0; i < array.length -2; i++){
			if(array[i].getOrderValue() === array[i+1].getOrderValue() 
				&& array[i].getOrderValue() == array[i+2].getOrderValue()){
				a.push(array[i]);
			}
		}
		if(a.length != 2) return -1;//没有两个三张，牌型不正确
		if(a[0].getOrderValue() > PokerUtils.AValue) return -1;//如果最大的牌大于A，牌形不正确(不能三个2 三个A)
		if(a[0].getOrderValue() - 1 === a[1].getOrderValue()) 
			return a[0].getOrderValue();//如果两个三张是连续的，牌型正确
		return -1;
	}
	/**
	 * 判断一手牌是否是飞机带两对
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isPlane2pairs(array:Array<Poker>):number{
		if(array.length != 10) return -1;
		let newArray:Array<Poker> = [];
		let three:Array<Poker> = [];
		
		for(let i = 0; i < array.length -2; i++){
			if(array[i].getOrderValue() == array[i+1].getOrderValue() 
				&& array[i].getOrderValue() == array[i+2].getOrderValue()){
				three.push(array[i]);
			}
			newArray = newArray.concat(PokerUtils.removePokers(array,[array[i],array[i+1],array[i+2]]));
		}
		if(three.length != 2) return -1;
		newArray = PokerUtils.removePokers(array,newArray);
		for(let i = 0 ; i < newArray.length -1; i += 2){
			if(newArray[i].getOrderValue() !== newArray[i+1].getOrderValue()) return -1;
		}
		if(three[0].getOrderValue() > PokerUtils.AValue) return -1;//如果最大的牌大于A，牌形不正确(不能三个2 三个A)
		if(three[0].getOrderValue() - 1 === three[1].getOrderValue()) return three[0].getOrderValue();
		return -1;
	}
	/**
	 * 判断一手牌是否是四带二
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isFour2Single(array:Array<Poker>):number{
		if(array.length != 6) return -1;
		for(let i = 0 ; i < array.length - 3 ; i ++){
			if(array[i].getOrderValue() === array[i+1].getOrderValue() 
				&& array[i].getOrderValue() ===array[i+2].getOrderValue() 
				&& array[i].getOrderValue() === array[i+3].getOrderValue()) 
				return array[i].getOrderValue(); 
		}
		return -1;
	}
	/**
	 * 判断一手牌是否是四带两对
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isFour2Pairs(array:Array<Poker>):number{
		let newArray:Array<Poker> = [];
		let four:Poker;
		if(array.length != 8) return -1;
		for(let i = 0 ; i < array.length -3 ; i ++){
			if(array[i].getOrderValue() === array[i+1].getOrderValue()
			&& array[i].getOrderValue() ===array[i+2].getOrderValue() 
			&& array[i].getOrderValue() === array[i+3].getOrderValue()){
				newArray = newArray.concat(PokerUtils.removePokers(array,[array[i],array[i+1],array[i+2],array[i+3]]));
				four = array[i];
			}
				
		}
		for(let i = 0 ; i < newArray.length -1; i += 2){
			if(newArray[i].getOrderValue() !== newArray[i+1].getOrderValue()) return -1;
		}
		return four.getOrderValue();
	}
}