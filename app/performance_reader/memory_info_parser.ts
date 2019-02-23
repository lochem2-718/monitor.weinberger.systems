// C# code
import * as file from 'file-system';
// using System;
// using System.IO;
// using System.Text;
// using System.Collections.Generic;


// namespace performance_reader
// {
//     public static class MemoryInfoParser
//     {
//         public static RAM Parse(string meminfoFilePath)
//         {
//             // get fields: SwapTotal, SwapFree, MemTotal, MemFree
//             string fileString = FileReader.Read(meminfoFilePath);
//             Dictionary<string, float> memDict = new Dictionary<string, float>();

//             Array.ForEach<string>(fileString.Split('\n'), line =>
//             {
//                 string[] pair =
//                     line
//                       .Replace(" ", "")  // remove spaces
//                       .Replace("kB", "") // remove kB label
//                       .Split(':');       // split into array of: [ string field, string value ]
//                 memDict.Add(pair[0], KilobytesToGigabytes(int.Parse(pair[1])));
//             });

//             RAM memInfo = new RAM();
//             memInfo.TotalMemory = memDict["MemTotal"];
//             memInfo.UsedMemory = memInfo.TotalMemory - memDict["MemFree"];
//             memInfo.TotalMemoryOnDisk = memDict["SwapTotal"];
//             memInfo.UsedMemoryOnDisk = memInfo.TotalMemoryOnDisk - memDict["SwapFree"];

//             return memInfo;
//         }

//         private static float KilobytesToGigabytes(int kilobytes)
//         {
//             return ((float)kilobytes) / ((float)Math.Pow(10, 6));
//         }
//     }
// }
