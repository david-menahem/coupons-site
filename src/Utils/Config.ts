class Config{
    
}

class DevelopmentConfig extends Config{
    public loginUrl = "http://localhost:8080/login/";
    public registerUrl = "http://localhost:8080/register/";
    public initilizerUrl = "http://localhost:8080/initializer/";
    public adminUrl = "http://localhost:8080/admin/";
    public companyUrl = "http://localhost:8080/companies/";
    public customerUrl = "http://localhost:8080/customers/";
    public userUrl = "http://localhost:8080/user/";
}

const appConfig = new DevelopmentConfig()

export default appConfig;