import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import {ProfileInstance } from "../model/Profile"

const secrete = process.env.JWT_SECRETE as string

export async function auth(req: Request | any, res: Response, next: NextFunction) {
    try {
        const {authorization} = req.headers;
    
        if (!authorization) {
            res.status(401).json({
                Error: 'Kindly sign in as a user'
            })
        }
        const token: string = authorization.split(' ')[1];

        let verified = jwt.verify(token, secrete);
    
        if (!verified) {
            return res.status(401).json({
                Error: "User not verified, you can't access the route"
            })
        }
        const {  profileId } = verified as { [key: string]: string }

        const user = await ProfileInstance.findOne({ where: {  profileId } })
        if (!user) {
            return res.status(404).json({
                Error: 'User not verified'
            })
        }

        req.user = verified;
        next();
    } catch (err) {
        return res.status(403).json({
            Error: 'User not logged in'
        })
    }

}