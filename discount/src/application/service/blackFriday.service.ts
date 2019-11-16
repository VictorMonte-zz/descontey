import { Injectable } from '@nestjs/common';

@Injectable()
export class BlackFridayService {

    private NOVEMBER: number = 11;

    isToday(): Boolean {

        const today = new Date();
        const blackFriday = this.getBlackFridayDate();

        return today.getDate() === blackFriday.getDate() 
        && today.getMonth() === blackFriday.getMonth();
    }

    private getBlackFridayDate() {
        var result = new Date(new Date().getFullYear(), this.NOVEMBER, 0);
        if (result.getDay() < 5) {
            result.setDate(result.getDate() - 7);
        }
    
        result.setDate(result.getDate() - (result.getDay() - 5));
        return result;
    }
}


