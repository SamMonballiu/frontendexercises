const assert = require('assert')

const employees = [
  { name: 'Marcel', salary: 3000, freelancer: true },
  { name: 'Sandra', salary: 3100, freelancer: false },
  { name: 'Thomas', salary: 2800, freelancer: false },
  { name: 'Alexander', salary: 3502, freelancer: false },
  { name: 'Els', salary: 3050, freelancer: true },
  { name: 'Igor', salary: 2600, freelancer: true },
  { name: 'Anne', salary: 2600, freelancer: true },
]

//* Hoeveel bedraagt de totale loonkost iedere maand?
function totalSalaries(employees) {
    // let sum = 0

    // for (let i = 0; i < employees.length; i++)
    // {
    //     const employee = employees[i]
    //     sum += employee.salary
    // }

    // return sum

    return employees.map(x => x.salary).reduce((x,y) => x + y);
}

assert.equal(totalSalaries(employees), 20652)


//* Welke freelancer verdient het meest?
function bestPaidFreelancer(employees) {
    
    // let bestPaidFreelancer = employees[0];

    // for (let i = 0; i < employees.length; i++)
    // {
    //     const employee = employees[i];
    //     if (employee.freelancer)
    //     {
    //         if (employee.salary > bestPaidFreelancer.salary)
    //         {
    //             bestPaidFreelancer = employee;
    //         }
    //     }
    // }
    //return bestPaidFreelancer.name;
    
    const freelancers = employees.filter(x => x.freelancer);
    const bestPaidFreelancer = freelancers.reduce(function (prev, current) {
        return (prev.salary > current.salary) ? prev : current
     });

    return bestPaidFreelancer.name;
}

assert.equal(bestPaidFreelancer(employees), 'Els')


//* Wie verdient er allemaal meer als 3000?
function earsMoreThan3k(employees) {
    // const highEarners = []
    // let index = 0;
    // for (let i = 0; i < employees.length; i++)
    // {
    //     const employee = employees[i];
    //     if (employee.salary > 3000)
    //     {
    //         highEarners[index] = employee.name;
    //         index++;
    //     }
    // }
    // //return highEarners;

    return employees.filter(x => x.salary > 3000);
    
}

// assert.deepEqual(earsMoreThan3k(employees), ['Sandra', 'Alexander', 'Els'])

//* Hoeveel verdient een interne medewerker gemiddeld?
function averageSalaryNonFreeLancer(employees) {
    // let salariesSum = 0;
    // let counter = 0;

    // for (let i = 0; i < employees.length; i++)
    // {
    //     if (!employees[i].freelancer)
    //     {
    //         salariesSum += employees[i].salary;
    //         counter++;
    //     }
    // }

    // return salariesSum / counter;

    const internen = employees.filter(x => !x.freelancer)
    const reducer = (x, y) => x + y.salary;
    const totalSalaris = internen.reduce(reducer, 0);
    return totalSalaris / internen.length;
}

assert.equal(averageSalaryNonFreeLancer(employees), 3134)


// //* Wie heeft de langste naam?
function longestName(employees) {
    // let longest = "";
    // for (let i = 0; i < employees.length; i++)
    // {
    //     const employee = employees[i];
    //     const empName = employee.name;

    //     if (empName.length > longest.length)
    //     {
    //         longest = empName;
    //     }
    // }
    //return longest;

    return employees.map(x => x.name).reduce((prev, current) => prev.length > current.length ? prev : current, "");
}

assert.equal(longestName(employees), 'Alexander')


//* Print de namen van alle werknemers, gesorteerd op voornaam.
function sortedNames(employees) {
    // const sorted = [];
    // for (let i = 0; i < employees.length; i++)
    // {
    //     sorted[i] = employees[i].name;
    // }
    // sorted.sort();
    // return sorted;
    return employees.map(x => x.name).sort();
}

assert.deepEqual(sortedNames(employees), ['Alexander', 'Anne', 'Els', 'Igor', 'Marcel', 'Sandra', 'Thomas'])

