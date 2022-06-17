// 日期格式
export const dayFormat = 'YYYY-MM-DD';
export const timeFormat = 'HH:mm:ss';
export const dateFormat = 'YYYY-MM-DD HH:mm:ss';
export const hourFormat = 'HH:mm';

//时间间隔
export const TIME_INTERVAL = {
    FIFMIN: "15",
    SEMIH: "30",
    FOUMIN: "45",
    HOUR: "60",
}

export const TIME_INTERVAL_STATUS = [
    { code: TIME_INTERVAL.FIFMIN, name: '15分钟' },
    { code: TIME_INTERVAL.SEMIH, name: '30分钟' },
    { code: TIME_INTERVAL.FOUMIN, name: '45分钟' },
    { code: TIME_INTERVAL.HOUR, name: '60分钟' },
]

//小数据分页页数
export const PAGE_NUM = {
    FIRST: '10',
    SECOND: '20',
    THIRD: '30',
    FOURTH: '50'
}

export const PAGE_NUM_STATUS = [
    { code: PAGE_NUM.FIRST, name: '10条/页' },
    { code: PAGE_NUM.SECOND, name: '20条/页' },
    { code: PAGE_NUM.THIRD, name: '30条/页' },
    { code: PAGE_NUM.FOURTH, name: '50条/页' },
]

//大数据分页
export const PAGE_NUM_MORE = {
    FIRST: '50',
    SECOND: '100',
    THIRD: '200',
    FOURTH: '300'
}

export const PAGE_NUM_MORE_STATUS = [
    { code: PAGE_NUM_MORE.FIRST, name: '50条/页' },
    { code: PAGE_NUM_MORE.SECOND, name: '100条/页' },
    { code: PAGE_NUM_MORE.THIRD, name: '200条/页' },
    { code: PAGE_NUM_MORE.FOURTH, name: '300条/页' },
]