from django.contrib import admin

from .models import User, Email

# Register your models here.
admin.site.register(User)


@admin.register(Email)
class EmailAdmin(admin.ModelAdmin):
    list_display = ["sender", "get_recipients", "subject", "timestamp"]

    def get_recipients(self, obj):
        return ", ".join([str(recipient) for recipient in obj.recipients.all()])

    get_recipients.short_description = "Recipients"