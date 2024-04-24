// Function to fetch all pets and display them
function getAllPets() {
    fetch('http://localhost:5000/pet')
        .then(response => response.json())
        .then(data => {
            console.log('All pets:', data);
            // Render the pets data in the all-pets-section
            const allPetsSection = document.getElementById('all-pets-section');
            allPetsSection.innerHTML = ''; // Clear previous content
            data.pets.forEach(pet => {
                const petDiv = document.createElement('div');
                petDiv.textContent = `Name: ${pet.name}, Category: ${pet.category}, Status: ${pet.status}`;
                allPetsSection.appendChild(petDiv);
            });
            allPetsSection.style.display = 'block'; // Show the section
        })
        .catch(error => console.error('Error fetching all pets:', error));
}

// Function to add a new pet
function addPet() {
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const status = document.getElementById('status').value;
    const petData = { name, category, status };

    fetch('http://localhost:5000/pet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('New pet added:', data);
        // Optionally, display a success message or update the UI
    })
    .catch(error => console.error('Error adding new pet:', error));
}

// Function to get pet by ID
function getPetById() {
    const petId = document.getElementById('pet-id').value;
    fetch(`http://localhost:5000/pet/${petId}`)
        .then(response => response.json())
        .then(data => {
            console.log('Pet by ID:', data);
            // Render the pet data in the get-pet-by-id-section
            const getPetByIdSection = document.getElementById('get-pet-by-id-section');
            getPetByIdSection.textContent = `Name: ${data.pet.name}, Category: ${data.pet.category}, Status: ${data.pet.status}`;
            getPetByIdSection.style.display = 'block'; // Show the section
        })
        .catch(error => console.error('Error fetching pet by ID:', error));
}

// Function to delete pet by ID
function deletePetById() {
    const petId = document.getElementById('delete-pet-id').value;
    fetch(`http://localhost:5000/pet/${petId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log('Pet deleted successfully');
            // Optionally, display a success message or update the UI
        } else {
            console.error('Error deleting pet:', response.statusText);
        }
    })
    .catch(error => console.error('Error deleting pet:', error));
}

// Function to get pets by status
function getPetsByStatus() {
    const status = document.getElementById('status').value;
    fetch(`http://localhost:5000/pet/findByStatus?status=${status}`)
        .then(response => response.json())
        .then(data => {
            console.log(`Pets by status '${status}':`, data);
            // Render the pets data in the pets-by-status-section
            const petsByStatusSection = document.getElementById('pets-by-status-section');
            petsByStatusSection.innerHTML = ''; // Clear previous content
            data.pets.forEach(pet => {
                const petDiv = document.createElement('div');
                petDiv.textContent = `Name: ${pet.name}, Category: ${pet.category}, Status: ${pet.status}`;
                petsByStatusSection.appendChild(petDiv);
            });
            petsByStatusSection.style.display = 'block'; // Show the section
        })
        .catch(error => console.error(`Error fetching pets by status '${status}':`, error));
}
