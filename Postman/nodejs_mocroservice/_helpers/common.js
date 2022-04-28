const models = require("../_models/index");

module.exports = {paymentCalculation, checkLevel, inWords}

async function paymentCalculation(cash_bonus, wining_amount, deposited_balance, entry_fee, contestType, discount = 0, bonusPercentage = 0) {
     var payment = {cash_bonus: 0, wining_amount: 0, deposited_balance: 0};

    if (discount > 0 && contestType === 'DISCOUNT') {
        let percentage = ((entry_fee * discount) / 100);
        entry_fee = entry_fee - percentage;
    }

    if ((cash_bonus + wining_amount + deposited_balance) >= entry_fee) {
        var cashBonusPerAmount = 0;
        if (contestType != 'PRIVATE') {
            cashBonusPerAmount = entry_fee * bonusPercentage / 100;
        }

        var afterCashLeft = 0;
        var afterDepoLeft = 0;

        //cash bonus
        if (cash_bonus != 0 && cash_bonus >= cashBonusPerAmount) {
            afterCashLeft = entry_fee - cashBonusPerAmount;
            payment.cash_bonus = Math.round(entry_fee - afterCashLeft);
        }else if(cash_bonus < cashBonusPerAmount){
			afterCashLeft = entry_fee - cash_bonus;
            payment.cash_bonus = Math.round(entry_fee - afterCashLeft);
		}

        //deposited_balance
        if (deposited_balance != 0) {

            if (afterCashLeft != 0) {
                if (afterCashLeft < deposited_balance) {
                    afterDepoLeft = deposited_balance - afterCashLeft;
                    payment.deposited_balance = Math.round(deposited_balance - afterDepoLeft);
                } else {
                    afterDepoLeft = afterCashLeft - deposited_balance;
                    payment.deposited_balance = Math.round(afterCashLeft - afterDepoLeft);
                }
            } else {
                if (entry_fee < deposited_balance) {
                    afterDepoLeft = deposited_balance - entry_fee;
                    payment.deposited_balance = Math.round(deposited_balance - afterDepoLeft);
                } else {
                    afterDepoLeft = entry_fee - deposited_balance;
                    payment.deposited_balance = Math.round(entry_fee - afterDepoLeft);
                }
            }
        } else {
            if (afterCashLeft != 0) {
                afterDepoLeft = afterCashLeft - deposited_balance;
            } else {
                afterDepoLeft = entry_fee - deposited_balance;
            }
        }

        //wining_amount
        if (wining_amount != 0) {
            if (Math.round(payment.cash_bonus + payment.deposited_balance) < entry_fee) {
                payment.wining_amount = Math.round(afterDepoLeft);
            }
        }
        return payment;
    } else {
        return payment;
    }

}

async function checkLevel(userId) {
    const settings = await models.settings.findOne({
        where: {
            key: 'level_limit'
        }
    });
    let settingData = JSON.parse(settings.value);
    const contestCount = await models.user_contests.count({
        where: {
            user_id: userId
        },
        include: [{
            model: models.contests,
            as: 'contest',
            where: {type: ['PAID', 'FREE', 'DISCOUNT']},
            required: false,
        }]
    });
    let newLevel = parseInt(parseInt(contestCount) / parseInt(settingData.limit));
    const user = await models.users.findByPk(userId);
    if (user.level < newLevel) {
        newLevel = parseInt(newLevel);
        user.level = newLevel;
        user.cash_bonus = parseFloat(user.cash_bonus) + parseFloat(settingData.bonus);
        await user.save();
    } else {
        newLevel = user.level;
    }
    return newLevel;
}

async function inWords(num) {
    var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if ((num = num.toString()).length > 9) return '';
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupees Only ' : '';
    return str;
}
