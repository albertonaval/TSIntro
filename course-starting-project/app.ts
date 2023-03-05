

enum Role { ADMIN, READ_ONLY, AUTHOR }

// enum Role {ADMIN=5, READ_ONLY, AUTHOR}

const person = {
    name: 'Alberto',
    age: 28,
    hobbies: ['sports', 'cooking'],
    role: Role.ADMIN
}




console.log(typeof person.hobbies, person.hobbies)

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase())
}