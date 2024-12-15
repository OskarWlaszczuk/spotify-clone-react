import {removeDuplicates} from "./common/functions/removeDuplicates";

export const Practicing = () => {


    const myMapFunction = <InputItem, OutputItem>(
        array: InputItem[],
        mapFunction: (item: InputItem, index?: number, array?: InputItem[]) => OutputItem
    ) => {
        const newArray = [] as OutputItem[];

        array.forEach((item, index, array) => {
            newArray.push(mapFunction(item, index, array));
        });

        return newArray;
    };

    console.log(
        myMapFunction(
            ['apple', 'banana', 'orange'],
            (item, index) => (
                `${item}, ${index}`
            )
        )
    );

    // fruits.forEach((item, index, array) => {
    //     console.log(item, index, array);
    // });


    // console.log(mappedFruits2);

    return (
        <></>
    );
};


// const arrayWithOcjectsWithDuplicatedKeys = [
//     {
//         id: 1,
//         name: 'John',
//         age: 20
//     },
//     {
//         id: 1,
//         name: 'John',
//         age: 20
//     },
//     {
//         id: 2,
//         name: 'Maya',
//         age: 21
//     },
//     {
//         id: 3,
//         name: 'Anna',
//         age: 22
//     }
// ];
//
// const arrayWithDuplicates = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
//
// console.log(removeDuplicates({list: arrayWithOcjectsWithDuplicatedKeys}));
// console.log((removeDuplicates({list: arrayWithDuplicates})));