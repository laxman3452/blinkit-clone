import AdminJS from "adminjs";
import AdminJSFastify from "@adminjs/fastify"
import * as AdminJSMongoose from '@adminjs/mongoose'
import * as Models from '../models/index.js'
import { authenticate, COOKIE_PASSWORD } from "./config.js";
import {dark,light} from "@adminjs/themes";

import { sessionStore}  from "./config.js";

AdminJS.registerAdapter(AdminJSMongoose)
export const admin = new AdminJS({
    resources: [
        {
            resource: Models.Customer,
            options:{
                listproperties:["phone","role","isActivated"],
                filterProperties:["phone","role"]
            }
        },
        {
            resource: Models.DeliveryPartner,
            options:{
                listproperties:["email","role","isActivated"],
                filterProperties:["email","role"]
            }
        },
        {
            resource: Models.Admin,
            options:{
                listproperties:["email","role","isActivated"],
                filterProperties:["email","role"]
            }
        },
        {
            resource: Models.branch
        },

    ],

    branding:{
        companyName:"Blinkit",
        withMadeWithLove: false,
        favicon:""
    },
    defaultTheme:dark.id,
    availableThemes:[dark,light],
    rootPath: "/admin",
})

export const buildAdminRouter = async(app)=>{
    await AdminJSFastify.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookiePassword:COOKIE_PASSWORD,
            cookieName:"adminjs",

        },
        app,
        {
            store:sessionStore,
            saveinitialized:true,
            secret:COOKIE_PASSWORD,
            cookie:{
                httpOnly:process.env.NODE_ENV === "production",
                secure:process.env.NODE_ENV === "production",

                
            }

        }



)}
