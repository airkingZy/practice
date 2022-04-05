import {fabric} from 'fabric'
/**
 * 获取地图种子
 * @param level
 * @returns
 */
async function mapSeed(): Promise<{ list: number[][] }> {
    console.time(`aa`);
    const xNumber = 100;
    const yNumber = 50;
    const data = createMapList({ xNumber, yNumber });
    console.log('data', data);
    return new Promise(async (resolve, reject) => {
        const res = await infectNearbyGrids({
            list: data.canvansList,
            originX: data.originX,
            originY: data.originY,
            infections: 250,
            xNumber,
            yNumber,
            cityCode: 1,
        });
        const resp = await infectNearbyGrids({
            list: res.list,
            originX: res.originX,
            originY: res.originY,
            infections: 150,
            xNumber,
            yNumber,
            cityCode: 2,
        });
        resolve({
            list: resp.list,
        });
    });
}

/**
 * 生成基础地图
 * @param param
 * @returns
 */
interface baseMapType {
    xNumber: number;
    yNumber: number;
}
function createMapList(param: baseMapType = { xNumber: 100, yNumber: 50 }): {
    canvansList: number[][];
    xNumber: number;
    yNumber: number;
    originX: number;
    originY: number;
} {
    const { xNumber, yNumber } = param;
    // 中心点
    const originX = Math.round(xNumber / 2);
    const originY = Math.round(yNumber / 2);
    const canvansList = [];
    for (let i = 0; i < yNumber; i++) {
        const data: number[] = [];
        canvansList.push(data);
        for (let k = 0; k < xNumber; k++) {
            if (i === originY && k === originX) {
                canvansList[i].push(1);
            } else {
                canvansList[i].push(0);
            }
        }
    }
    return {
        canvansList,
        originX,
        originY,
        xNumber,
        yNumber,
    };
}
interface infectNearbyGridsType {
    list: number[][]; //二维地图数组
    originX: number; //x原点
    originY: number; //y原点
    infections: number; //次数
    xNumber: number; //边界x
    yNumber: number; //边界y
    cityCode: number; //渲染code
}

function infectNearbyGrids(param: infectNearbyGridsType): Promise<{ list: number[][]; originX: number; originY: number }> {
    return new Promise((resolve, reject) => {
        try {
            let { originX, originY } = param;
            const { infections, list, xNumber, yNumber, cityCode } = param;
            let loopNumber = 0;
            do {
                const aroundIndex = getAroundIndex({
                    list,
                    xIndex: originX,
                    yIndex: originY,
                    boundaryX: xNumber - 1,
                    boundaryY: yNumber - 1,
                });
                if (aroundIndex.length > 0) {
                    const newIndex = getRamdomNumber(0, aroundIndex.length - 1);
                    originX = aroundIndex[newIndex][0];
                    originY = aroundIndex[newIndex][1];
                    list[originY][originX] = cityCode;
                    loopNumber++;
                } else {
                    // 附近没有位置了，尝试随机突破
                    originX = originX + (Math.floor(Math.random() * (1 - -1 + 1)) + -1);
                    originY = originY + (Math.floor(Math.random() * (1 - -1 + 1)) + -1);
                }
            } while (loopNumber <= infections);
            resolve({
                list,
                originX,
                originY,
            });
        } catch (error) {
            reject(error);
        }

        // resolve { list, originX, originY };
    });
}

/**
 * 取出四周空的坐标
 * @param param
 * @returns
 */
interface getAroundIndexType {
    list: number[][];
    xIndex: number;
    yIndex: number;
    boundaryX: number;
    boundaryY: number;
}
function getAroundIndex(param: getAroundIndexType) {
    const { xIndex, yIndex, boundaryX, boundaryY, list } = param;
    const arr = [];
    // 左上
    // if (xIndex - 1 >= 0 && yIndex - 1 >= 0 && list[yIndex - 1][xIndex - 1] === 0) {
    //     arr.push([xIndex - 1, yIndex - 1]);
    // }
    // 正上
    if (yIndex - 1 >= 0 && list[yIndex - 1][xIndex] === 0) {
        arr.push([xIndex, yIndex - 1]);
    }
    // 右上
    // if (xIndex + 1 <= boundaryX && yIndex - 1 >= 0 && list[yIndex - 1][xIndex + 1] === 0) {
    //     arr.push([xIndex + 1, yIndex - 1]);
    // }
    // 右边
    if (xIndex + 1 <= boundaryX && list[yIndex][xIndex + 1] === 0) {
        arr.push([xIndex + 1, yIndex]);
    }
    // 右下
    // if (yIndex + 1 <= boundaryY && xIndex + 1 <= boundaryX && list[yIndex + 1][xIndex + 1] === 0) {
    //     arr.push([xIndex + 1, yIndex + 1]);
    // }
    // 正下
    if (yIndex + 1 <= boundaryY && list[yIndex + 1][xIndex] === 0) {
        arr.push([xIndex, yIndex + 1]);
    }
    // // 左下
    // if (xIndex - 1 <= boundaryX && yIndex + 1 <= boundaryY && list[yIndex + 1][xIndex - 1] === 0) {
    //     arr.push([xIndex - 1, yIndex + 1]);
    // }
    // 左边
    if (xIndex - 1 >= 0 && list[yIndex][xIndex - 1] === 0) {
        arr.push([xIndex - 1, yIndex]);
    }
    return arr;
}
/**
 * 获取指定范围随机正整数
 * @param min
 * @param max
 * @returns
 */
function getRamdomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
interface initBaseLineType{
    width:number,
     height:number,
     xNumber:number,
     yNumber:number,
     cubeArea?:number
}
class drawMap {
    public fabricCanvas: any
    public domId: string
    public mapWitdh: number
    public mapHeight: number
    constructor(domId: string) {
        this.fabricCanvas = null
        this.domId = domId
        this.mapWitdh = 0
        this.mapHeight = 0
    }
    initBaseMap(width:number, height:number,bg:string){
        this.mapWitdh = width
        this.mapHeight = height
        this.fabricCanvas = new fabric.Canvas(this.domId,{ // eslint-disable-line
            backgroundColor: bg,width,height
        })
    }
    initBaseLine(params: initBaseLineType){
        const {cubeArea=10,width,height,xNumber,yNumber} =  params
        const lineDef = {
            fill: 'black',
            stroke: 'rgba(0, 0, 0, 0.1)',
            strokeWidth: 1,
            selectable: false
        }
        const xLoop = width/cubeArea < xNumber ? xNumber: Math.ceil(width/cubeArea)
        const yLoop = height/cubeArea < yNumber ? yNumber: Math.ceil(height/cubeArea)
        for(let i = 0;i< xLoop;i++){
            const line = new fabric.Line([i*cubeArea,0,i*cubeArea,width],lineDef );
            this.fabricCanvas.add(line)
        }
        for(let i = 0;i< yLoop;i++){
            const line = new fabric.Line([0,i*cubeArea,width,i*cubeArea],lineDef );
            this.fabricCanvas.add(line)
        }
    }
}
export { mapSeed, drawMap };
