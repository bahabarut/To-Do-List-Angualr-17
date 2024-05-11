import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from '../Models/TaskModel';

@Pipe({ name: 'filterPipe', standalone: true })
export class filterPipe implements PipeTransform {
    transform(value: TaskModel[], status: string): any {
        // var data = value.filter(f => status == "all" ? null : (status == "done" ? f.Status : !f.Status));
        var data = null;
        if (status == "all")
            data = value;
        else if (status == "done")
            data = value.filter(f => f.Status);
        else
            data = value.filter(f => !f.Status);
        return data;

    }
}