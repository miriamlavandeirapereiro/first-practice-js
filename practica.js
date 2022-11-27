import { rl, isInt } from "./utils.js";
import { students, availableMaleNames, availableFemaleNames, availableGenders } from "./data.js";

function showMenu() {
    console.log("1) Mostrar en formato de tabla todos los alumnos. ")
    console.log("2) Mostrar por consola la cantidad de alumnos que hay en clase. ")
    console.log("3) Mostrar por consola todos los nombres de los alumnos. ")
    console.log("4) Eliminar el último alumno de la clase. ")
    console.log("5) Eliminar un alumno aleatoriamente de la clase. ")
    console.log("6) Mostrar por consola todos los datos de los alumnos que son chicas. ")
    console.log("7) Mostrar por consola el número de chicos y chicas que hay en la clase. ")
    console.log("8) Mostrar true o false por consola si todos los alumnos de la clase son chicas. ")
    console.log("9) Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años. ")
    console.log("10) Añadir un alumno nuevo con los siguientes datos: ")
    console.log("11) Mostrar por consola el nombre de la persona más joven de la clase. ")
    console.log("12) Mostrar por consola la edad media de todos los alumnos de la clase. ")
    console.log("13) Mostrar por consola la edad media de las chicas de la clase. ")
    console.log("14) Añadir nueva nota a los alumnos. Por cada alumno de la clase, tendremos que calcular una nota de forma aleatoria(número entre 0 y 10) y añadirla a su listado de notas. ")
    console.log("15) Ordenar el array de alumnos alfabéticamente según su nombre. ")
};

function calculateRandomNumber(min, max) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
};

function getNumberFromConsole() {
    const promise = new Promise((resolve, reject) => {
        rl.question("¿Qué operación deseas hacer? Introduce un número: ", (num) => {
            rl.pause();
            if (isInt(num)) {
                num = Number.parseInt(num);
                resolve(num);
            } else {
                reject();
            }
        });
    });

    return promise;
}

function selectOption(option) {
    if (option !== 10 && students.length === 0) {
        console.log("No hay alumnos.");
    } else {
        switch (option) {
            case 1:
                console.table(students);
                break;
            case 2:
                console.log("Hay un total de " + students.length + " alumnos.");
                break;
            case 3:
                students.forEach(student => console.log(student.name));
                break;
            case 4:
                students.pop();
                console.log("El último alumno de la clase ha sido eliminado.");
                break;
            case 5:
                const randomNumber = calculateRandomNumber(0, students.length - 1);
                students.splice(randomNumber);
                console.log("Un alumno ha sido eliminado de manera aleatoria.");
                break;
            case 6:
                const femaleStudents = students.filter(student => student.gender === 'female');
                console.log("Alumnas de la clase:");
                console.table(femaleStudents);
                break;
            case 7:
                const maleStudentsNumber = students.filter(student => student.gender === 'male');
                const femaleStudentsNumber = students.filter(student => student.gender === 'female');
                console.log("En la clase hay: " + maleStudentsNumber.length + " alumno(s).");
                console.log("En la clase hay: " + femaleStudentsNumber.length + " alumna(s).");
                break;
            case 8:
                const onlyFemaleStudents = students.every(student => student.gender === 'female');
                console.log("Todos los alumnos de la clase son chicas: " + onlyFemaleStudents);
                break;
            case 9:
                const studentsAge = students.filter(student => student.age >= 20 && student.age <= 25);
                if (studentsAge.length >= 1) {
                    studentsAge.forEach(student => console.log(student.name + " tiene " + student.age + " años."));
                } else {
                    console.log("No hay alumnos de entre 20 y 25 años de edad.");
                }
                break;
            case 10:
                const randomGenderIndex = calculateRandomNumber(0, availableGenders.length - 1);
                const randomGender = availableGenders[randomGenderIndex];
                const randomAge = calculateRandomNumber(20, 50);
                let randomName = null;

                if (randomGender === 'female') {
                    const randomNameIndex = calculateRandomNumber(0, availableFemaleNames.length - 1);
                    randomName = availableFemaleNames[randomNameIndex];
                } else {
                    const randomNameIndex = calculateRandomNumber(0, availableMaleNames.length - 1);
                    randomName = availableMaleNames[randomNameIndex];
                }
                const newStudent = {
                    age: randomAge,
                    examScores: [],
                    gender: randomGender,
                    name: randomName,
                };

                students.push(newStudent);
                console.log("Se ha añadido un nuevo alumno.")
                break;
            case 11:
                let studentMinAge = null;
                students.forEach(student => {
                    if(!studentMinAge || student.age < studentMinAge.age){
                        studentMinAge = student;
                    }
                });
                console.log("El alumno más joven se llama: " + studentMinAge.name);
                break;
            case 12:
                const averageAge = students.reduce((accum, student) => accum + student.age, 0) / students.length;
                console.log("La edad media de los alumnos es " + Math.round(averageAge));
                break;
            case 13:
                const femaleStudentsAge = students.filter(student => student.gender === 'female');
                const averageFemaleAge = femaleStudentsAge.reduce((accum, student) => accum + student.age, 0) / femaleStudentsAge.length;
                console.log("La edad media de las chicas es " + Math.round(averageFemaleAge));
                break;
            case 14:
                students.forEach(student => {
                    const randomScore = calculateRandomNumber(0, 10);
                    student.examScores.push(randomScore);
                })
                console.log("Nuevas notas añadidas.");
                break;
            case 15:
                students.sort((student1, student2) => {
                    if (student1.name > student2.name) {
                      return 1;
                    }
                    if (student1.name < student2.name) {
                      return -1;
                    }
                    return 0;
                  });
                console.log("Los alumnos han sido ordenador alfabéticamente.")
                break;
        }
    }

}

async function startGame() {
    let numberFromConsole = null;

    do {
        showMenu();
        try {
            numberFromConsole = await getNumberFromConsole();
        } catch (error) {
            console.log("Introduce un número de operación correcto: ");
            numberFromConsole = null;
        }
        selectOption(numberFromConsole);
    } while (!numberFromConsole || (numberFromConsole > 0 && numberFromConsole < 16))

    process.exit(0);
}

startGame();
