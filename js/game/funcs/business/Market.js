Market = function (id) {
    this.id = id;
    this.type = null;
    this.owner = null;
    this.price = 0;
    this.is_for_sell = false;
    this.things = Array();
    this.employees = Array();
    this.budget = 0;
    this.profit = 0;
    this.loss = 0;
    this.tax = 0;
    this.sellThing = function (id) {
        var thing = this.things[id];
        var tax = thing.price * 0.2;
        var profit = thing.price - tax;
        this.budget += profit;
        return {
            profit: profit,
            tax: tax
        };
    };
    this.changeBudget = function (amount) {
        var tax = amount > 0 ? amount * 0.2 : 0;
        var profit = amount - tax;
        this.budget += profit;
        this.profit += profit > 0 ? profit : 0;
        this.loss += profit < 0 ? -profit : 0;
        this.tax += tax;
        return {
            budget: this.budget,
            profit: this.profit,
            loss: this.loss,
            tax: this.tax
        };
    };
    this.addEmployee = function (User, Profession, pay) {
        this.employees[this.employees.length] = {
            user: User,
            profession_id: Profession.id,
            pay: pay,
            time: Date.now(),
            last_paid: Date.now()
        };
    };
    this.pay = function (employee_id) {
        var employee = this.employees[employee_id];
        var last_paid = employee.last_paid;
        var new_last_paid = Date.now();
        var pay = Math.round((new_last_paid - employee.last_paid) / 1000 * (employee.pay / 60));
        this.employees[employee_id].last_paid = new_last_paid;
        employee.user.economy.money += pay * 0.8;
        return this.changeBudget(pay);
    };
    this.unEmployeed = function (id) {
        this.pay(id);
        this.employees.splice(id, 1);
    }
};

Stats = function (id) {
    this.business_id = id;
    this.budget = Array();
    this.profit = Array();
    this.loss = Array();
    this.sells = Array();
    this.investition = function (amount) {
        this.changeBudget(amount);
    };
    this.lossing = function (amount) {
        this.loss[this.loss.length] = {
            time: Date.now(),
            lossMoney: amount
        };
    };
    this.profitting = function (amount) {
        this.profit[this.profit.length] = {
            time: Date.now(),
            addMoney: amount
        };
    };
    this.changeBudget = function (amount) {
        this.budget[this.budget.length] = {
            time: Date.now(),
            amount: this.getLastBudget().amount + amount
        };
    };
    this.getLastBudget = function () {
        return this.budget.length > 0 ? this.budget[this.budget.length - 1] : {
            time: 0,
            amount: 0
        };
    };
    this.budgetDifference = function () {
        var maxBudget = {
            time: 0,
            amount: 0
        };
        var minBudget = {
            time: 0,
            amount: Infinity
        };
        for (i = 0; i < this.budget.length; i++) {
            if (this.budget[i].amount < minBudget.amount) {
                minBudget = this.budget[i];
            }
            if (this.budget[i].amount > maxBudget.amount) {
                maxBudget = this.budget[i];
            }
        }
        if (minBudget.amount === Infinity) {
            minBudget.amount = 0;
        }
        return {
            max: maxBudget,
            min: minBudget
        };
    };
    this.thingsBuyingDifference = function () {
        var maxBuyedThing = {
            id: 0,
            amount: 0
        };
        var minBuyedThing = {
            id: 0,
            amount: Infinity
        };
        for (title in this.sells) {
            if (thing = title.match(/^thing_(\d+)$/)) {
                var id = thing[1];
                var amount = this.sells[title];
                if (amount > maxBuyedThing.amount) {
                    maxBuyedThing = {
                        id: id,
                        amount: amount
                    };
                } else if (amount < minBuyedThing.amount) {
                    minBuyedThing = {
                        id: id,
                        amount: amount
                    };
                }
            }
        }
        if (minBuyedThing.amount === Infinity) {
            minBuyedThing.amount = 0;
        }
        return {
            max: maxBuyedThing,
            min: minBuyedThing
        };
    };
    this.selling = function (id, amount) {
        this.sells["thing_" + id] += amount;
    };
    this.getStats = function () {
        var budget = this.getLastBudget();
        var budgetDiff = this.budgetDifference();
        var buyingThings = this.thingsBuyingDifference();
        return {
            budget: budget,
            maxBudget: budgetDiff.max,
            minBudget: budgetDiff.min,
            budgetDifference: budgetDiff.max - budgetDiff.min,
            maxBuyingThing: buyingThings.max,
            minBuyingThing: buyingThings.min
        };
    };
};
