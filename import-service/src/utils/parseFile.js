import csv from 'csv-parser';
import { s3 } from '../aws.js';

export const parseFile = (params) => {
  return new Promise((resolve, reject) => {
    const s3Stream = s3.getObject(params).createReadStream();
    const results = [];

    s3Stream
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => {
        results.push(data);
      })
      .on('error', (error) => {
        reject(error);
      })
      .on('end', () => {
      resolve(results);
    })
  });
}