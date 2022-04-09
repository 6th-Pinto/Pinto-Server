import { Token } from "typedi"
import {
    sameSchooelSameMajorWaitingLine,
    sameSchooleDiffMajorWaitingLine,
    diffSchooleWaitingLine
} from "../waiting/waiting.controller"

export const sameSchooleSameMajor = async (
  req: Request,
  res: Response
): Promise<void> => {
    try {
      
    } catch (e) {
        console.log(e)
  }
}

export const sameSchooleDiffMajor = async(
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userMajor = req.body;
        sameSchooleDiffMajorWaitingLine.push(userMajor);

    } catch (e) {
        console.log(e)
        return;
    }
}

export const diffSchoole = (
    req: Request,
    res: Response
) => {
    try {
        const user = req.body;
        diffSchooleWaitingLine.push(user);

    } catch (e) {
    console.log(e)
    }
}