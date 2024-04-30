from django import forms
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator

User = get_user_model()

class SignUpForm(forms.ModelForm):
    first_name = forms.CharField(max_length=30,
                                 required=True, 
                                 help_text='Required.', 
                                 error_messages={'required': 'Please enter your first name.'})
    last_name = forms.CharField(max_length=30, 
                                required=True,
                                help_text='Required.', 
                                error_messages={'required': 'Please enter your last name.'})
    email = forms.EmailField(max_length=254, 
                             help_text='Required. Inform a valid email address.', 
                             error_messages={'required': 'Please enter an email address.', 'invalid': 'Please enter a valid email address.'})
    password = forms.CharField(
        widget=forms.PasswordInput,
        help_text='Password must be at least 8 characters and contain at least one number and one letter.',
        validators=[
            RegexValidator(
                regex='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$',
                message='Password must be at least 8 characters long and contain at least one letter and one number.'
            )
        ]
    )

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password')

    def clean_email(self):
        email = self.cleaned_data['email'].strip().lower()
        if User.objects.filter(email=email).exists():
            raise ValidationError("This email is already registered.")
        return email

    def save(self, commit=True):
        user = super().save(commit=False)
        user.username = self.cleaned_data['email']  # Ensuring the username is set to the email
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user
