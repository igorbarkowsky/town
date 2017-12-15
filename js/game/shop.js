class shop {
    private id = 0;
    private title = "No title";
    private owner = 0;
    private price = 0;
    private is_selling = false;
    private item_list = {};

    public shop = function (id, title, owner, price, is_selling, item_list) {
        this.id = id;
        this.title = title;
        this.owner = owner;
        this.price = price;
        this.is_selling = is_selling;
        this.item_list = item_list;
    };

    public get = function () {
        return this;
    };

    public sell = function (price) {
        this.is_selling = true;
        this.price = price;
    };

    public buy = function (owner) {
        if (this.is_selling && owner.economy.money >= this.price) {
            owner.economy.money -= this.price;
            this.owner = owner.id;
        }
    }
}