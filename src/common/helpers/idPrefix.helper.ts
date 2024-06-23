
export const validIdPrefix = (prefix: string): boolean => ['Ad', 'Th', 'St', 'Sf'].includes(prefix)

export const idPrefixFunc = (userId: string): string => userId.slice(0, 2)

export const roleFromIdPrefix = (userId: string): string | undefined=> {
    const prefix = idPrefixFunc(userId)

    if (prefix == 'Ad'){
        return 'admin'
    }else if (prefix == 'Th'){
        return 'teacher'
    }else if (prefix == 'St'){
        return 'student'
    }else if (prefix == 'Sf'){
        return 'staff'
    }else{
        return undefined
    }
}
