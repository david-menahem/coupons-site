class Config{
    
}

class DevelopmentConfig extends Config{
    public loginUrl = "http://localhost:8080/login/";
    public registerUrl = "http://localhost:8080/register/";
    public adminUrl = "http://localhost:8080/admin/";
    public companyUrl = "http://localhost:8080/companies/";
    public customerUrl = "http://localhost:8080/customers/";
    public userUrl = "http://localhost:8080/user/";
}

class ProductionConfig extends Config{
    public loginUrl = "https://guarded-escarpment-28316.herokuapp.com/login/";
    public registerUrl = "https://guarded-escarpment-28316.herokuapp.com/register/";
    public adminUrl = "https://guarded-escarpment-28316.herokuapp.com/admin/";
    public companyUrl = "https://guarded-escarpment-28316.herokuapp.com/companies/";
    public customerUrl = "https://guarded-escarpment-28316.herokuapp.com/customers/";
    public userUrl = "https://guarded-escarpment-28316.herokuapp.com//user/";
}

const appConfig = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default appConfig;