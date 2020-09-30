package com.example.technoxtream17.expensetracker.controller;

import static com.example.technoxtream17.expensetracker.constant.Paths.API;
import static com.example.technoxtream17.expensetracker.constant.Paths.BEGINBRACES;
import static com.example.technoxtream17.expensetracker.constant.Paths.CATEGORIES;
import static com.example.technoxtream17.expensetracker.constant.Paths.CATEGORY;
import static com.example.technoxtream17.expensetracker.constant.Paths.ENDBRACES;
import static com.example.technoxtream17.expensetracker.constant.Paths.FORWARDSLASH;
import static com.example.technoxtream17.expensetracker.constant.Paths.ID;
import static com.example.technoxtream17.expensetracker.constant.Paths.VERSION;
import static org.slf4j.LoggerFactory.getLogger;
import static com.example.technoxtream17.expensetracker.constant.Paths.CATEGORYNOTFOUND;
import static com.example.technoxtream17.expensetracker.constant.Paths.CATEGORYIDNOTFOUND;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Locale;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.technoxtream17.expensetracker.error.GenericNotFoundException;
import com.example.technoxtream17.expensetracker.model.Category;
import com.example.technoxtream17.expensetracker.service.CategoryService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(FORWARDSLASH+API+FORWARDSLASH+VERSION)
@Validated
@Api
public class CategoryController {
	
	private static final Logger LOGGER = getLogger(CategoryController.class);
	
	@Autowired
	MessageSource messageSource;
	
	@Autowired(required=true)
	private CategoryService categoryService;
	
	@ApiOperation("Get all Categories")
	@GetMapping(FORWARDSLASH+CATEGORIES)
	Collection<Category> getCategories(){
		return categoryService.getAllCategory();
	}
	
	@ApiOperation("Get Category by Id")
	@GetMapping(FORWARDSLASH+CATEGORY+FORWARDSLASH+BEGINBRACES+ID+ENDBRACES)
	ResponseEntity<?> getCategory(@PathVariable(ID) int id){
		Optional<Category> category = categoryService.getCategory(id);
		if(!category.isPresent()) {
			throw new GenericNotFoundException(messageSource.getMessage(CATEGORYNOTFOUND, null, Locale.ENGLISH));
		}
		return ResponseEntity.ok().body(category.get());
	}
	
	@ApiOperation("Create Category ")
	@PostMapping(FORWARDSLASH+CATEGORY)
	ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) throws URISyntaxException{
		Category result = categoryService.createCategory(category);
		return ResponseEntity.created(new URI(FORWARDSLASH+API+FORWARDSLASH+VERSION+FORWARDSLASH+CATEGORY+FORWARDSLASH+result.getCategoryId())).body(result);
	}
	
	@ApiOperation("Update Category ")
	@PutMapping(FORWARDSLASH+CATEGORY+FORWARDSLASH+BEGINBRACES+ID+ENDBRACES) 
	ResponseEntity<Object> updateCategory(@Valid @RequestBody Category category, @PathVariable(ID) int id) throws URISyntaxException{
		Object result = categoryService.updateCategory(category, id);
		return ResponseEntity.ok().body(result);
	}
	
	@ApiOperation("Delete Category ")
	@DeleteMapping(FORWARDSLASH+CATEGORY+FORWARDSLASH+BEGINBRACES+ID+ENDBRACES)
	ResponseEntity<?> deleteCategory(@PathVariable(ID) int id){
		Optional<Category> category = categoryService.getCategory(id);
		if(!category.isPresent()) {
			throw new GenericNotFoundException(messageSource.getMessage(CATEGORYIDNOTFOUND, null, Locale.ENGLISH));
		}
		categoryService.deleteCategory(id);
		return ResponseEntity.ok().build();
	}

}
