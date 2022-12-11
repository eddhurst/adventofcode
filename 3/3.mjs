import test from './test.mjs';
import input from './input.mjs'

const findDuplicates = (group1, group2, group3) => {
    let duplicates = {};

    group1.forEach(item => {
        if (group2.some(checkItem => item === checkItem)) {
            if (group3.some(checkItem => item === checkItem)) {
                if (duplicates[item]) {
                    duplicates[item] += 1
                } else {
                    duplicates[item] = 1
                }
            }
        }
    })

    return duplicates;
}

const calculatePriorityValue = (duplicates) => (
    duplicates.reduce((acc, items) => {
        const item = Object.keys(items)[0];

        if (item) {
            let itemValue = item.charCodeAt(0)
            if (itemValue > 96) {
                itemValue -= 96
            } else {
                itemValue -= 38
            }
            return acc += itemValue;
        } else {
            return acc;
        }
    }, 0)
)

const splitBackpackCompartments = (data) => data.split('\n').reduce((acc, backpack) => {
    const backpackArr = backpack.split('');

    const compartment1 = backpackArr.slice(0, backpackArr.length / 2)
    const compartment2 = backpackArr.slice(backpackArr.length / 2)

    const duplicates = findDuplicates(compartment1, compartment2);

    return [
        ...acc,
        duplicates
    ]
}, [])


const groupTeams = (teamData) => {
    const acc = [];

    for (let i = 0; i < teamData.length; i += 3) {
        const backpack1 = teamData[i].split('');
        const backpack2 = teamData[i + 1].split('');
        const backpack3 = teamData[i + 2].split('');

        const duplicates = findDuplicates(backpack1, backpack2, backpack3);
        console.info(teamData[i], teamData[i + 1], teamData[i + 2], duplicates);

        acc.push(duplicates)
    }

    return acc;
}

const duplicates = groupTeams(input.split('\n'));

console.info(duplicates);

console.info( calculatePriorityValue(duplicates) );





// Buffer