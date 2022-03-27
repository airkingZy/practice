import { isDisabled } from '@testing-library/user-event/dist/utils';
import { rejects } from 'assert';
import { resolve } from 'path';

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
// function drawCanvas(id: string) {
//     const canvas: HTMLCanvasElement = document.getElementById('canvas');
//     const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
//     //描绘背景
//     const gradient = ctx.createLinearGradient(0, 0, 0, 300); //createLinearGradient() 方法创建线性的渐变对象。
//     gradient.addColorStop(0, '#e0e0e0');
//     gradient.addColorStop(1, '#ffffff');
//     ctx.fillStyle = gradient;
//     // eslint-disable-next-line
//     ctx.fillRect = (0, 0, canvas.width, canvas.height); // eslint-disable-line
//     //描绘边框
//     const grid_cols = 10;
//     const grid_rows = 10;
//     const cell_height = canvas.height / grid_rows;
//     const cell_width = canvas.width / grid_cols;
//     ctx.lineWidth = 1;
//     ctx.strokeStyle = '#a0a0a0';
//     //结束边框描绘
//     ctx.beginPath();
//     //准备画横线
//     for (let col = 0; col <= grid_cols; col++) {
//         const x = col * cell_width;
//         ctx.moveTo(x, 0);
//         ctx.lineTo(x, canvas.height);
//     }
//     //准备画竖线
//     for (let row = 0; row <= grid_rows; row++) {
//         const y = row * cell_height;
//         ctx.moveTo(0, y);
//         ctx.lineTo(canvas.width, y);
//     }
//     //完成描绘
//     ctx.stroke();
// }
class drawCanvas {
    public element: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public list: number[][];
    constructor(domId: string, list: number[][]) {
        this.element = document.getElementById(domId) as HTMLCanvasElement;
        this.ctx = this.element.getContext('2d') as CanvasRenderingContext2D;
        this.list = list;
    }
    draw() {
        //描绘背景
        // const gradient = this.ctx.createLinearGradient(0, 0, 0, 300); //createLinearGradient() 方法创建线性的渐变对象。
        // gradient.addColorStop(0, '#e0e0e0');
        // gradient.addColorStop(1, '#e0e0e0');
        // this.ctx.fillStyle = gradient;
        const originX = 0;
        const originY = 0;
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(originX, originY, this.element.width, this.element.height);
        //描绘边框
        const grid_cols = this.list[0].length;
        const grid_rows = this.list.length;
        const cell_height = this.element.height / grid_rows;
        const cell_width = this.element.width / grid_cols;
        // this.ctx.lineWidth = 0.15;
        // this.ctx.strokeStyle = '#000000';
        //结束边框描绘
        this.ctx.beginPath();
        this.ctx.moveTo(200, 0);
        this.ctx.lineTo(200 + 0.5, this.element.height);
        //准备画横线
        // for (let col = 10.5; col <= this.element.width; col += 10) {
        //     // const x = col * cell_width;
        //     this.ctx.moveTo(col, 0);
        //     this.ctx.lineTo(col, this.element.height);
        // }
        // for (let j = 10.5; j < this.element.height; j += 10) {
        //     this.ctx.moveTo(0, j);
        //     this.ctx.lineTo(this.element.width, j);
        // }

        //准备画竖线
        // for (let row = 0; row <= grid_rows; row++) {
        //     const y = row * cell_height;
        //     this.ctx.moveTo(0, y);
        //     this.ctx.lineTo(this.element.width, y);
        // }
        //完成描绘
        this.ctx.stroke();
    }
}
export { mapSeed, drawCanvas };
