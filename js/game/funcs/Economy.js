Economy = function (money, credit, debt) {
    this.money = money;
    this.credit = credit;
    this.debt = debt;
};

Credit = function (user) {
    this.user = user;
    this.list = Array();
};
Credit.prototype.addCredit = function (amount, percentage, period) {
    this.list[this.list.length] = {
        amount: amount,
        percentage: percentage,
        period: period
    };
};