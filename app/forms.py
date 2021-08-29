from django import forms


class newStoryForm(forms.Form):
    name = forms.CharField(label="Story Location:", widget=forms.TextInput())
    details = forms.CharField(label="Details:", widget=forms.Textarea())
