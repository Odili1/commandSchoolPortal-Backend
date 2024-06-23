// import { Command, CommandRunner, Option } from "nest-commander";
// import { AdminService } from "./modules/user/admin/admin.service";



// console.log('admin user file');


// @Command({
//     name: 'create-admin',
//     description: 'Create a new Admin User'
// })

// export class CreateAdminCommand extends CommandRunner{
//     constructor(
//         private adminService: AdminService
//     ){
//         super()
//     }

//     async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
//         const username = options.username
//         const password = options.password

//         console.log(username);
        

//         if (!username || !password){
//             console.error('Username and Password are required');
//             return
//         }

//         await this.adminService.createAdmin({username, password})
//         console.log('Admin created successfully.');
        

        
//     }
//     @Option({
//         flags: '-u, --username <username>',
//         description: 'The username of the Admin user'
//     })
//     parseUsername(val: string): string{
//         return val;
//     }

//     @Option({
//         flags: '-p, --password <password>',
//         description: 'The password of the Admin user'
//     })
//     parsePassword(val: string): string{
//         return val;
//     }
// }



