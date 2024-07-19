

export const calculateAge = (dateOfBirth: string | Date) => {
    // Parse the input dateOfBirth to a Date object if it is a string
    const dob = new Date(dateOfBirth);
    const today = new Date();

    // Calculate the difference in years
    let age = today.getFullYear() - dob.getFullYear();

    // Adjust the difference if the birthday hasn't occurred yet this year
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    return age;
}