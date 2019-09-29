from apps.accounts.forms import LoginForm,RegisterForm

def login_form(request):
    login_form = LoginForm()
    return  locals()

def register_form(request):
    register_form = RegisterForm()
    return locals()

