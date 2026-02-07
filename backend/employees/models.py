from django.db import models

class Employee(models.Model):
    employee_id = models.CharField(
        max_length=20,
        unique=True,
        editable=False
    )
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=50)

    def save(self, *args, **kwargs):
        if not self.employee_id:
            last_employee = Employee.objects.order_by('id').last()
            if last_employee:
                last_id = int(last_employee.employee_id.replace("EMP", ""))
                self.employee_id = f"EMP{last_id + 1:04d}"
            else:
                self.employee_id = "EMP0001"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.full_name
