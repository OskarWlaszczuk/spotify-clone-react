// import { useMemo } from "react";

// export const useGenerateUniqueListId = () => {
//     const randomValue = useMemo(() => Math.random(), []);

//     const updateList = (list) => {
//         return list?.map((item) => (
//             { ...item, listId: randomValue }
//         ));
//     }

//     // const updatedList = useMemo(() => {
//     //     return list?.map((item) => ({
//     //         ...item,
//     //         listId: randomValue,
//     //     }));
//     // }, [list, randomValue]);

//     return updateList;
// };

// // export const useGenerateUniqueListId2 = (list) => {
// //     const randomValue = useMemo(() => Math.random(), []);

// //     // const updateList = (list) => {
// //     //     return list?.map((item) => (
// //     //         { ...item, listId: randomValue }
// //     //     ));
// //     // }

// //     const updatedList = useMemo(() => {
// //         return list?.map((item) => ({
// //             ...item,
// //             listId: randomValue,
// //         }));
// //     }, [list, randomValue]);

// //     return updatedList;
// // };