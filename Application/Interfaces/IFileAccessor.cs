using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Files;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IFileAccessor
    {
        Task<FileUploadResult> AddFile(IFormFile file);
        Task<string> DeleteFile(string publicId);
        Task<string> DeleteFiles(List<string> publicIds);
    }
}