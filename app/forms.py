from django import forms


class newStoryForm(forms.Form):
    title = forms.CharField(label="Story:", widget=forms.TextInput())
    content = forms.CharField(label="Content:", widget=forms.Textarea())
